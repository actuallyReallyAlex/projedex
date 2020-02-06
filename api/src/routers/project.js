const express = require("express");
const router = new express.Router();
const Project = require("../models/project");
const auth = require("../middleware/auth");
const { Octokit } = require("@octokit/rest");

router.post("/projects", auth, async (req, res) => {
  const project = new Project({ ...req.body, owner: req.user._id });

  try {
    await project.save();
    res.status(201).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/projects", auth, async (req, res) => {
  try {
    await req.user.populate({ path: "projects" }).execPopulate();
    res.send(req.user.projects);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/projects/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const project = await Project.findOne({ _id, owner: req.user._id });

    if (!project) {
      return res.status(404).send();
    }

    res.send(project);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/projects/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid operation." });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).send();
    }

    updates.forEach(update => (project[update] = req.body[update]));

    await project.save();

    res.send(project);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/projects/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).send();
    }

    res.send(project);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/projects-import", auth, async (req, res) => {
  try {
    const octokit = new Octokit({ auth: req.user.gitHubPersonalAccessToken });
    const userResponse = await octokit.request("/user");

    const { login, public_repos } = userResponse.data;
    const fields = [
      { name: "gitHubLogin", value: login },
      { name: "gitHubPublicRepoCount", value: public_repos }
    ];

    fields.forEach(({ name, value }) => {
      if (value) {
        req.user[name] = value;
      } else {
        req.user[name] = "";
      }
    });

    await req.user.save();

    const repoResponse = await octokit.request("/user/repos");
    const repoData = repoResponse.data;
    const ownedRepoData = repoData.filter(repo => repo.owner.login === login);

    ownedRepoData.forEach(async ownedRepo => {
      const project = new Project({
        owner: req.user._id,
        name: ownedRepo.name
      });
      await project.save();
    });

    res.status(201).send();
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

module.exports = router;

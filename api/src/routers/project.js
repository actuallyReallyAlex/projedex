const express = require("express");
const router = new express.Router();
const Project = require("../models/project");
const auth = require("../middleware/auth");

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
  const allowedUpdates = ["name", "description"];
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

module.exports = router;

const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const axios = require('axios')
const { Octokit } = require('@octokit/rest')
const Project = require('../models/project')

// * ✅ 1. Hit /gh -> API sends back a URL (Step 1)
// * ✅ 2. UI hits that URL (Step 1)
// * ✅ 3. User authenticates on GitHub (Step 1)
// * ✅ 4. User is redirected to /gh-redirect?code=**** with a special code as a parameter (Step 2)
// * ✅ 5. API hits GitHub with that code and gets back an access token (Step 2)
// * ✅ 6. API saves that access token to the User profile (Step 3)

router.get('/gh', auth, async (req, res) => {
  // * ✅ 1. Hit /gh -> API sends back a URL (Step 1)
  // * ✅ 2. UI hits that URL (Step 1)
  // * ✅ 3. User authenticates on GitHub (Step 1)

  try {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&scope=repo`
    res.send({ url })
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/gh-redirect', async (req, res) => {
  // * ✅ 4. User is redirected to /gh-redirect?code=**** with a special code as a parameter (Step 2)
  // * ✅ 5. API hits GitHub with that code and gets back an access token (Step 2)
  // * ✅ 6. API saves that access token to the User profile (Step 3)

  try {
    const { code } = req.query
    let access_token = 'mock-access-token'

    if (!process.env.MOCK) {
      // * Prod
      const gitHubResponse = await axios({
        method: 'POST',
        url: `https://github.com/login/oauth/access_token?client_id=${process.env.OAUTH_CLIENT_ID}&client_secret=${process.env.OAUTH_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}`,
        headers: { Accept: 'application/json' }
      })

      access_token = gitHubResponse.data.access_token
    }

    res.redirect(`${process.env.UI_DOMAIN}/gh?accessToken=${access_token}`)
  } catch (e) {
    res.status(500).send()
  }
})

// * 1 - Get list of owned repos (UI asks what to import)
// * 2 - Either all / a list of some - Get repo info from GitHub API using Octokit (UI Will wait)
// * 3 - Add repos as projects to the database, associated with this use (UI will wait)
// * 4 - Send back array of owned projects (UI will display list of projects)

// * User has created their authentication token, and now wants to import GitHub Repos
router.get('/gh-import', auth, async (req, res) => {
  // * Phase 1 = get list of repos
  try {
    if (!process.env.MOCK) {
      const octokit = new Octokit({ auth: req.user.accessToken })
      // ! Won't return more than 100 repos
      // TODO - Allow for paginiation in requests
      const response = await octokit.repos.list({ per_page: 100 })
      const repos = response.data.map(({ id, name }) => ({ id, name }))

      res.send(repos)
    } else {
      res.send([{ id: 'mock-id-1', name: 'mock-repo-1' }])
    }
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/gh-import', auth, async (req, res) => {
  // * Phase 2 = using a list from the UI, get and store the repo info as projects
  const { repos } = req.body // * Array of Repos that the User wants to select

  try {
    let filteredRepos = [
      {
        description: 'mock-description-1',
        name: 'mock-name-1',
        owner: req.user._id,
        repoId: 'mock-repoId-1'
      }
    ]
    if (!process.env.MOCK) {
      const octokit = new Octokit({ auth: req.user.accessToken })

      const response = await octokit.repos.list({ per_page: 100 })

      const requestedRepoIds = repos.map(({ id }) => id)

      filteredRepos = response.data.filter(({ id }) => requestedRepoIds.includes(id))
    }

    const promises = filteredRepos.map(async ({ description, id, name }) => {
      const project = new Project({
        description,
        name,
        owner: req.user._id,
        repoId: id
      })

      await project.save()
    })

    await Promise.all(promises)

    const projects = await Project.find({ owner: req.user._id })

    res.status(201).send({ projects })
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router

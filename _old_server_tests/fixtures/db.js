const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Project = require('../../src/models/project')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Bob',
  email: 'bob@example.com',
  password: 'Red1234567890',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'George',
  email: 'george@example.com',
  password: 'Red1234567890',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }
  ]
}

const projectOne = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Project One',
  owner: userOneId,
  description: 'Mock Description 1'
}

const projectTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Project Two',
  owner: userOneId,
  description: 'Mock Description 2'
}

const projectThree = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Project Three',
  owner: userTwoId,
  description: 'Mock Description 3'
}

const projectFour = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Project Four',
  owner: userTwoId,
  description: 'Mock Description 4'
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Project.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Project(projectOne).save()
  await new Project(projectTwo).save()
  await new Project(projectThree).save()
  await new Project(projectFour).save()
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  projectOne,
  projectTwo,
  projectThree,
  projectFour,
  setupDatabase
}

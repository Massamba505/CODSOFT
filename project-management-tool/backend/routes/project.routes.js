const express = require('express');
const router = express.Router();
const {createProject, getProjects, getProjectById, updateProject, deleteProject} = require('../controllers/project.controller');
const {protectRoute} = require('../middlewares/protectRoute');

// Route to create a new project
router.post('/projects', protectRoute, createProject);

// Route to get all projects for the logged-in user
router.get('/projects', protectRoute, getProjects);

// Route to get a specific project by ID
router.get('/projects/:id', protectRoute, getProjectById);

// Route to update a project by ID
router.put('/projects/:id', protectRoute, updateProject);

// Route to delete a project by ID
router.delete('/projects/:id', protectRoute, deleteProject);

module.exports = router;

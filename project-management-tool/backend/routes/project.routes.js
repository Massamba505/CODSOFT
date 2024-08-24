const express = require('express');
const router = express.Router();
const {createProject, getProjects, getProjectById, updateProject, deleteProject} = require('../controllers/project.controller');
const {protectRoute} = require('../middlewares/protectRoute');

router.post('/', protectRoute, createProject);

router.get('/', protectRoute, getProjects);

router.get('/:id', protectRoute, getProjectById);

router.put('/:id', protectRoute, updateProject);

router.delete('/:id', protectRoute, deleteProject);

module.exports = router;

const express = require('express');
const router = express.Router();
const {createTask, getTasks, getTaskById, updateTask, deleteTask} = require('../controllers/task.controller');
const {protectRoute} = require('../middlewares/protectRoute');

// Route to create a new task in a specific project
router.post('/projects/:projectId/tasks', protectRoute, createTask);

// Route to get all tasks for a specific project
router.get('/projects/:projectId/tasks', protectRoute, getTasks);

// Route to get a specific task by ID within a specific project
router.get('/projects/:projectId/tasks/:id', protectRoute, getTaskById);

// Route to update a task by ID within a specific project
router.put('/projects/:projectId/tasks/:id', protectRoute, updateTask);

// Route to delete a task by ID within a specific project
router.delete('/projects/:projectId/tasks/:id', protectRoute, deleteTask);

module.exports = router;

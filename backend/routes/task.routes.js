const express = require('express');
const router = express.Router();
const {createTask, getTasks, getTaskById, updateTask, deleteTask} = require('../controllers/task.controller');
const {protectRoute} = require('../middlewares/protectRoute');

//api/tasks
// Route to create a new task in a specific project
router.post('/projects/:projectId', protectRoute, createTask);

// Route to get all tasks for a specific project
router.get('/projects/:projectId', protectRoute, getTasks);

// Route to get a specific task by ID within a specific project
router.get('/projects/:projectId/:id', protectRoute, getTaskById);

// Route to update a task by ID within a specific project
router.put('/projects/:projectId/:id', protectRoute, updateTask);

// Route to delete a task by ID within a specific project
router.delete('/projects/:projectId/:id', protectRoute, deleteTask);

module.exports = router;

const Task = require("../models/task");
const Project = require("../models/project");

const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate ,user} = req.body;
        const { projectId } = req.params;

        if (!title || !description || !dueDate || !user) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const project = await Project.findById(projectId);

        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: "Project not found" });
        }

        const newTask = new Task({
            title,
            description,
            status: status || "pending",
            dueDate,
            project: projectId,
            user: user,
        });

        await newTask.save();

        project.tasks.push(newTask._id);
        await project.save();

        return res.status(201).json(newTask);
    } catch (error) {
        console.error("Error in createTask controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ project: projectId, user: req.user._id }).populate("user");

        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in getTasks controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id, projectId } = req.params;
        const task = await Task.findOne({ _id: id, project: projectId, user: req.user._id }).populate("user");

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error("Error in getTaskById controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, status, dueDate,user } = req.body;
        const { id, projectId } = req.params;

        const task = await Task.findOne({ _id: id, project: projectId, user: req.user._id });

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;
        task.user = user || task.user;

        await task.save();

        return res.status(200).json(task);
    } catch (error) {
        console.error("Error in updateTask controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id, projectId } = req.params;

        const task = await Task.findOne({ _id: id, project: projectId, user: req.user._id });

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        await Task.findByIdAndDelete(task._id);

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTask controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};

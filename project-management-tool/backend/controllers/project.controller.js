const Project = require("../models/project");
const Task = require("../models/task");

const createProject = async (req, res) => {
    try {
        const { name, description, dueDate } = req.body;

        if (!name || !description || !dueDate) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newProject = new Project({
            name,
            description,
            dueDate,
            user: req.user._id,
        });

        await newProject.save();

        req.user.projects.push(newProject._id);
        await req.user.save();

        return res.status(201).json(newProject);
    } catch (error) {
        console.error("Error in createProject controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user._id }).populate("tasks");

        return res.status(200).json(projects);
    } catch (error) {
        console.error("Error in getProjects controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("tasks");

        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.error("Error in getProjectById controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateProject = async (req, res) => {
    try {
        const { name, description, dueDate } = req.body;

        const project = await Project.findById(req.params.id);

        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: "Project not found" });
        }

        project.name = name || project.name;
        project.description = description || project.description;
        project.dueDate = dueDate || project.dueDate;

        await project.save();

        return res.status(200).json(project);
    } catch (error) {
        console.error("Error in updateProject controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: "Project not found" });
        }

        await Task.deleteMany({ project: project._id }); // Delete associated tasks
        await project.remove();

        return res.status(200).json({ message: "Project and associated tasks deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProject controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export const login = (data) => API.post('/auth/login', data);
export const signup = (data) => API.post('/auth/signup', data);
export const logout = () => API.post('/auth/logout');

export const fetchProjects = () => API.get('/projects');
export const fetchProjectById = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const fetchTasks = (projectId) => API.get(`/projects/${projectId}/tasks`);
export const fetchTaskById = (projectId, id) => API.get(`/projects/${projectId}/tasks/${id}`);
export const createTask = (projectId, data) => API.post(`/projects/${projectId}/tasks`, data);
export const updateTask = (projectId, id, data) => API.put(`/projects/${projectId}/tasks/${id}`, data);
export const deleteTask = (projectId, id) => API.delete(`/projects/${projectId}/tasks/${id}`);

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ViewTask = () => {
  const [task, setTask] = useState(null);
  const { id, taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/projects/${id}/${taskId}`);
        if (response.ok) {
          const data = await response.json();
          setTask(data);
        } else {
          console.error("Failed to fetch task");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id, taskId]);

  
  const handleDelete = async () => {
    try {
      await fetch(`/api/tasks/projects/${id}/${taskId}`, {
        method: "DELETE",
      });
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  if (!task) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">View Task</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-1">Title:</label>
        <p className="px-3 py-2 border rounded-md bg-gray-100">{task.title}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-1">Description:</label>
        <p className="px-3 py-2 border rounded-md bg-gray-100">{task.description}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-1">Status:</label>
        <p className="px-3 py-2 border rounded-md bg-gray-100 capitalize">{task.status}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-1">Due Date:</label>
        <p className="px-3 py-2 border rounded-md bg-gray-100">
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-1">Assigned to:</label>
        <p className="px-3 py-2 border rounded-md bg-gray-100">
          {task.user.fullName} ({task.user.email})
        </p>
      </div>
      <button
        onClick={() => navigate(`/projects/${id}/tasks/${taskId}/edit`)}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Edit Task
      </button>
      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white font-bold mt-4 py-2 px-4 rounded-md hover:bg-red-600"
      >
        Delete Task
      </button>
    </div>
  );
};

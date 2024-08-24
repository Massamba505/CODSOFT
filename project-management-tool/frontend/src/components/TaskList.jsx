import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch(`/api/tasks/projects/${projectId}`);
        const data = await res.json();
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    getTasks();
  }, [projectId]);

  const handleDelete = async (taskId) => {
    try {
      await fetch(`/api/tasks/projects/${projectId}/${taskId}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Tasks</h2>
      <hr className="mb-6"></hr>
      <Link
        to={`/projects/${projectId}/tasks/new`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-6 inline-block"
      >
        Create New Task
      </Link>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">{task.title}</h3>
              <hr></hr>
              <div className="flex-grow">
              <p className="text-gray-700 mb-2 mt-3"><strong>Description:</strong> {task.description}</p>
                <p className="text-gray-600 mb-2"><strong>Status:</strong> {task.status}</p>
                <p className="text-gray-600 mb-2"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                <p className="text-gray-600"><strong>Assigned to:</strong> {task.user?.fullname} ({task.user?.email})</p>
              </div>
              <div className="flex space-x-2 mt-4">
                <Link
                  to={`/projects/${projectId}/tasks/${task._id}`}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                  View Task
                </Link>
                <Link
                  to={`/projects/${projectId}/tasks/${task._id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Edit Task
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

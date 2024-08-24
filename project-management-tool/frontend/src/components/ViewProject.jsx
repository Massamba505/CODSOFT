import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TaskList } from "./TaskList"; // Importing TaskList to show associated tasks
import { useNavigate } from "react-router-dom";

export const ViewProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error.message);
        navigate("/");
      }
    };

    getProject();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error("Error deleting project:", error.message);
      navigate("/");
    }
  };

  if (!project) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-lg text-gray-600 mt-2">Description: {project.description}</p>
          <p className="text-sm text-gray-500 mt-1">Due: {new Date(project.dueDate).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Link
            to={`/projects/${id}/edit`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Edit Project
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Delete Project
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Associated Tasks</h2>
        <TaskList projectId={id} />
      </div>
    </div>
  );
};

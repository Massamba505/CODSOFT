import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link to="/create-project" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Project
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length == 0? <h1 className="text-3xl">You currently don't have any Projects</h1>:
        projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <p className="text-sm text-gray-500">Due: {new Date(project.dueDate).toLocaleDateString()}</p>
            <Link
              to={`/projects/${project._id}`}
              className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              View Project
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();

        const { name, description, dueDate } = data;
        setName(name);
        setDescription(description);
        setDueDate(new Date(dueDate).toISOString().split("T")[0]);
      } catch (error) {
        console.error("Error fetching project:", error.message);
        navigate("/");
      }
    };

    getProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      const res = await fetch(`/api/projects/${id}`,{
        method : "PUT",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify({ name, description, dueDate })
      });

      const data = await res.json();
      console.log(data);

      navigate(`/projects/${id}`);
    } catch (error) {
      console.error("Error updating project:", error.message);
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

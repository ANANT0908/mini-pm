import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ProjectForm from "./ProjectForm";
import { Project } from "../../types";

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      status
      dueDate
    }
  }
`;

export default function ProjectList(): JSX.Element {
  const { data, loading, error } = useQuery(GET_PROJECTS, { fetchPolicy: "cache-and-network" });
  const [showForm, setShowForm] = useState(false);

  const projects: Project[] = data?.projects || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-gray-600">Active projects for your organization</p>
        </div>
        <div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
          >
            {showForm ? "Close" : "New Project"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6">
          <ProjectForm onCreate={() => {
            // hide form after create
            setShowForm(false);
          }} />
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          <div className="h-10 bg-white rounded shadow animate-pulse" />
          <div className="h-10 bg-white rounded shadow animate-pulse" />
          <div className="h-10 bg-white rounded shadow animate-pulse" />
        </div>
      )}

      {error && (
        <div className="text-red-600">Error loading projects: {error.message}</div>
      )}

      {!loading && projects.length === 0 && (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-700 mb-4">No projects yet. Create your first project to get started.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
          >
            Create first project
          </button>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-medium">{p.name}</h2>
              <span className="text-sm text-gray-600">{p.status}</span>
            </div>
            {p.description && <p className="text-sm text-gray-700 mt-2">{p.description}</p>}
            {p.dueDate && (
              <p className="text-xs text-gray-500 mt-3">Due: {new Date(p.dueDate).toLocaleDateString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

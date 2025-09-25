import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String, $dueDate: String) {
    createProject(name: $name, description: $description, dueDate: $dueDate) {
      project {
        id
        name
        description
        status
        dueDate
      }
    }
  }
`;


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

type Props = {
  onCreate?: () => void;
};

export default function ProjectForm({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setName("");
      setDescription("");
      setDueDate("");
      if (onCreate) onCreate();
    },
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createProject({
      variables: {
        name: name.trim(),
        description: description.trim() || null,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      },
      optimisticResponse: {
        createProject: {
          __typename: "CreateProject",
          project: {
            __typename: "ProjectType",
            id: `temp-${Date.now()}`,
            name,
            description,
            status: "ACTIVE",
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          },
        },
      },
    });
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <div className="grid gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="E.g., Website Redesign"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create project"}
          </button>
          {error && <div className="text-sm text-red-600">Error: {error.message}</div>}
        </div>
      </div>
    </form>
  );
}

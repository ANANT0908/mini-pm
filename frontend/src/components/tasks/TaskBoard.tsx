import React from "react";

export default function TaskBoard() {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-medium">Task board</h3>
      <p className="text-sm text-gray-600 mt-2">
        No active board in this demo. When you open a project we'll show tasks here (kanban w/ drag & drop).
      </p>
    </div>
  );
}

import React from 'react'
import ProjectList from './components/projects/ProjectList'

export default function App() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Mini PM — Dashboard</h1>
      <ProjectList />
    </div>
  )
}

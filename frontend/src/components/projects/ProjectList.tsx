import React, { useEffect, useState } from 'react'
import client from '../../apollo/client'
import { gql } from '@apollo/client'

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
`

export default function ProjectList() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    client.query({ query: GET_PROJECTS })
      .then(res => {
        setProjects(res.data.projects || [])
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading projects…</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="space-y-4">
      {projects.length === 0 && <div className="text-gray-500">No projects found for the current organization.</div>}
      {projects.map(p => (
        <div key={p.id} className="bg-white shadow rounded p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{p.name}</h2>
            <span className="text-sm text-gray-600">{p.status}</span>
          </div>
          {p.description && <p className="text-sm text-gray-700 mt-2">{p.description}</p>}
        </div>
      ))}
    </div>
  )
}

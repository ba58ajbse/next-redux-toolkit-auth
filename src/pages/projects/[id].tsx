import React from 'react'
import { useRouter } from 'next/router'

const ProjectPage: React.FC = () => {
  const router = useRouter()
  return (
    <div>
      <h3>{router.query.id}</h3>
      <p>project page</p>
    </div>
  )
}

export default ProjectPage

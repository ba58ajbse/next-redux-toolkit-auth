import React from 'react'
import Link from 'next/link'
import { GroupType } from '../interfaces/user'

type PropType = {
  group: GroupType
}

const ProjectsList: React.FC<PropType> = ({ group }) => {
  return (
    <div>
      <Link href="/projects/[id]" as={`/projects/${group.id}`}>
        {group.name}
      </Link>
    </div>
  )
}

export default ProjectsList

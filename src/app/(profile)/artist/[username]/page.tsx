import React from 'react'

interface ParamsProps {
  params: { username: string }
}

const Artist = ({ params: { username } }: ParamsProps) => {
  return (
    <div>
      {username}
    </div>
  )
}

export default Artist
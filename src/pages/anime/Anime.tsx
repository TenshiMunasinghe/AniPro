import React from 'react'
import { useParams } from 'react-router-dom'

interface Props {}

type ParamTypes = {
  id: string
}

const Anime = (props: Props) => {
  const { id } = useParams<ParamTypes>()
  console.log(id)

  return <div>yo</div>
}

export default Anime

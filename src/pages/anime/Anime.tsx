import React from 'react'
import { useParams } from 'react-router-dom'

interface Props {}

type ParamTypes = {
  id: string
}

export const Anime = (props: Props) => {
  const { id } = useParams<ParamTypes>()

  return <div>yo</div>
}

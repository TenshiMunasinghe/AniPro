import React from 'react'
import { MediaType } from '../../../generated/index'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import Home from './Home'
import MediaSearchResult from './MediaSearchResult/MediaSearchResult'

interface Props {
  type: MediaType
}

const Media = ({ type }: Props) => {
  const { queryVars } = useUpdateUrlParam()

  return (
    <div>
      {Object.keys(queryVars.initial).length === 0 ? (
        <Home type={type} />
      ) : (
        <MediaSearchResult type={type} />
      )}
    </div>
  )
}

export default Media

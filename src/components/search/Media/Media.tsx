import React from 'react'
import { MediaType } from '../../../generated/index'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import SearchBarInput from '../../common/SearchBarInput/SearchBarInput'
import Home from './Home'
import styles from './Home.module.scss'
import MediaSearchResult from './MediaSearchResult/MediaSearchResult'

interface Props {
  type: MediaType
}

const Media = ({ type }: Props) => {
  const { queryVars } = useUpdateUrlParam()

  return (
    <div className={styles.container}>
      <SearchBarInput link={`/search/${type.toLowerCase()}`} />
      {Object.keys(queryVars.initial).length === 0 ? (
        <Home type={type} />
      ) : (
        <MediaSearchResult type={type} />
      )}
    </div>
  )
}

export default Media

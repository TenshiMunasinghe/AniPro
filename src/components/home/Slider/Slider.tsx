import React from 'react'
import { Link } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import {
  SearchResultQueryVariables,
  useSearchResultQuery,
} from '../../../generated/index'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Slide from '../Slide/Slide'
import styles from './Slider.module.scss'

interface Props {
  queryVar: SearchResultQueryVariables
  context: string
}

const Slider = ({ queryVar, context }: Props) => {
  const { data, isLoading } = useSearchResultQuery(gqlRequestClient, {
    ...queryVar,
    perPage: 5,
  })

  return (
    <section className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <header className={styles.header}>
            <Link to='/' className={styles.siteName}>
              AniPro
            </Link>
            <div className={styles.context}>{context}</div>
          </header>
          <section className={styles.slider}>
            {!isLoading && data?.Page?.media && data.Page.media.length > 0 && (
              <>
                {data?.Page?.media?.map(media =>
                  media ? <Slide media={media} key={media.id} /> : null
                ) || null}
              </>
            )}
          </section>
        </>
      )}
    </section>
  )
}

export default Slider

import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import styles from './CardLoading.module.scss'

const CardLoading = () => {
  return (
    <SkeletonTheme color='#515151' highlightColor='#818181'>
      <div className={styles.wrapper}>
        <Skeleton className={styles.image} />
        <div className={styles.cardBody}>
          <Skeleton className={styles.title} />
          <div className={styles.genres}>
            <Skeleton className={styles.genre} />
            <Skeleton className={styles.genre} />
            <Skeleton className={styles.genre} />
            <Skeleton className={styles.genre} />
            <Skeleton className={styles.genre} />
          </div>
          <Skeleton className={styles.description} count={5} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default CardLoading

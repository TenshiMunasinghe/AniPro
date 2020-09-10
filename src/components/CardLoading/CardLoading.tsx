import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import styles from './CardLoading.module.scss'
import { CardType } from '../../pages/search/Search'

interface Props {
  type: CardType
}

const CardLoading = ({ type }: Props) => {
  switch (type) {
    case 'simple':
      return (
        <SkeletonTheme color='#515151' highlightColor='#818181'>
          <div className={styles.simple}>
            <Skeleton className={styles.image} />
            <Skeleton className={styles.title} />
          </div>
        </SkeletonTheme>
      )
    case 'default':
      return (
        <SkeletonTheme color='#515151' highlightColor='#818181'>
          <div className={styles.default}>
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
    default:
      return <></>
  }
}

export default CardLoading

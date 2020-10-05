import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import styles from './CardLoading.module.scss'
import { CardType } from '../../pages/search/Search'

interface Props {
  type: CardType
}

const color = '#454545'
const highlightColor = '#616161'

const CardLoading = ({ type }: Props) => {
  switch (type) {
    case 'simple':
      return (
        <SkeletonTheme color={color} highlightColor={highlightColor}>
          <div className={styles.simple}>
            <div className={styles.imageWrapper}>
              <Skeleton className={styles.image} />
            </div>
            <Skeleton className={styles.title} />
          </div>
        </SkeletonTheme>
      )
    case 'default':
      return (
        <SkeletonTheme color={color} highlightColor={highlightColor}>
          <div className={styles.default}>
            <Skeleton className={styles.image} />

            <div className={styles.content}>
              <div className={styles.cardBody}>
                <div className={styles.header}>
                  <Skeleton className={styles.title} />
                  <Skeleton className={styles.secondaryTitle} />
                </div>
                <Skeleton className={styles.description} count={4} />
              </div>

              <div className={styles.footer}>
                <div className={styles.genres}>
                  <Skeleton className={styles.genre} />
                  <Skeleton className={styles.genre} />
                  <Skeleton className={styles.genre} />
                </div>
              </div>
            </div>
          </div>
        </SkeletonTheme>
      )
    default:
      return <></>
  }
}

export default React.memo(CardLoading)

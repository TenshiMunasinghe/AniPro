import React, { memo } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import styles from './CardLoading.module.scss'
import { CardType } from '../../../pages/search/Search'

interface Props {
  type: CardType
}

const color = 'var(--color-foreground-200)'
const highlightColor = 'var(--color-foreground-300)'

export const CardLoading = memo(({ type }: Props) => {
  switch (type) {
    case 'cover':
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
    case 'chart':
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
    case 'table':
      return (
        <SkeletonTheme color={color} highlightColor={highlightColor}>
          <div className={styles.table}>
            <div className={styles.imageWrapper}>
              <Skeleton className={styles.image} />
            </div>

            <div className={styles.content}>
              <div className={styles.header}>
                <Skeleton className={styles.title} />
                <div className={styles.genres}>
                  <Skeleton className={styles.genre} />
                  <Skeleton className={styles.genre} />
                  <Skeleton className={styles.genre} />
                </div>
              </div>

              <div className={styles.row}>
                <Skeleton className={styles.rowContent} />
                <div className={styles.subRow}>
                  <Skeleton className={styles.subRowContent} />
                </div>
              </div>
              <div className={styles.row}>
                <Skeleton className={styles.rowContent} />
                <div className={styles.subRow}>
                  <Skeleton className={styles.subRowContent} />
                </div>
              </div>
              <div className={styles.row}>
                <Skeleton className={styles.rowContent} />
                <div className={styles.subRow}>
                  <Skeleton className={styles.subRowContent} />
                </div>
              </div>
            </div>
          </div>
        </SkeletonTheme>
      )
    default:
      return <></>
  }
})

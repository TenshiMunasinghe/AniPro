import { memo } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { CardType } from '../../../../pages/search/Search'
import styles from './CardLoading.module.scss'

interface Props {
  type: CardType
}

const color = 'var(--color-foreground-300)'
const highlightColor = 'var(--color-foreground-400)'

const CardLoading = ({ type }: Props) => {
  switch (type) {
    case 'cover':
      return (
        <SkeletonTheme color={color} highlightColor={highlightColor}>
          <div className={styles.cover}>
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
          <div className={styles.chart}>
            <div className={styles.imageWrapper}>
              <Skeleton className={styles.image} />
            </div>

            <div className={styles.content}>
              <div className={styles.cardBody}>
                <div className={styles.header}>
                  <Skeleton className={styles.title} />
                  <Skeleton className={styles.secondaryTitle} />
                </div>
                <Skeleton className={styles.description} count={2} />
              </div>

              <div className={styles.footer}>
                <Skeleton className={styles.genre} count={2} />
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
}

export default memo(CardLoading)

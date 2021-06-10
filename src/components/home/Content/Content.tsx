import { Link } from 'react-router-dom'
import { QueryVar, FetchedMedias } from '../../../api/types'
import { allowedURLParams } from '../../../filterOptions/filterOptions'
import { CardType } from '../../../pages/search/Search'
import CardGrid from '../../common/CardGrid/CardGrid'
import styles from './Content.module.scss'
import { useFetchSearchResult } from '../../../hooks/useFetchSearchResult'
import { useMemo } from 'react'

export type _Content = {
  text: string
  cardType: CardType
  hasRank?: boolean
}

interface Medias extends FetchedMedias {
  rank?: number | null
}

interface Props {
  queryVar: QueryVar
  content: _Content
}

const Content = ({ queryVar, content }: Props) => {
  const { perPage, ...filterQuery } = Object.fromEntries(
    Object.entries(queryVar).filter(([k]) =>
      //filter out the query variable which is not a filter option
      allowedURLParams.includes(k)
    )
  )

  const { medias, isLoading, isError } = useFetchSearchResult(
    new URLSearchParams(Object.entries(queryVar))
  )

  const _medias: Medias[] | null = useMemo(() => {
    if (!medias) return null

    return medias
      .map(m => {
        const _ranking = m.rankings.find(
          r => (r.context = 'highest rated all time')
        )
        const rank = _ranking ? _ranking.rank : null
        return { ...m, rank }
      })
      .sort((a, b) => (a.rank && b.rank ? a.rank - b.rank : 0))
  }, [medias])

  const link = `/search?${new URLSearchParams(filterQuery).toString()}`

  return (
    <section className={styles.content}>
      <div className={styles.title}>
        <Link to={link} className={styles.contentTitle}>
          {content.text}
        </Link>
        <Link to={link} className={styles.viewAll}>
          View All
        </Link>
      </div>
      <CardGrid
        medias={_medias}
        isLoading={isLoading}
        isError={isError}
        cardType={content.cardType}
        imageSize={content.cardType === 'table' ? 'large' : 'extraLarge'}
        sideScroll={content.cardType === 'cover'}
      />
    </section>
  )
}

export default Content

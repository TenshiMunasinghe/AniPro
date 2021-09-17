import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import { allowedURLParams } from '../../../filterOptions/filterOptions'
import {
  SearchResultQueryVariables,
  useSearchResultQuery,
} from '../../../generated/index'
import { CardType } from '../../../pages/search/Search'
import CardGrid, { MediaWithRank } from '../../common/CardGrid/CardGrid'
import styles from './Content.module.scss'

export type _Content = {
  text: string
  cardType: CardType
  hasRank?: boolean
}

interface Props {
  queryVar: SearchResultQueryVariables
  content: _Content
}

const Content = ({ queryVar, content }: Props) => {
  const { perPage, ...filterQuery } = Object.fromEntries(
    Object.entries(queryVar).filter(([k]) =>
      //filter out the query variable which is not a filter option
      allowedURLParams.includes(k)
    )
  )

  const { data, isLoading, isError } = useSearchResultQuery(
    gqlRequestClient,
    queryVar
  )

  const medias = useMemo(() => {
    const _medias = data?.Page?.media
    if (!_medias) return null
    if (!content.hasRank) return _medias as MediaWithRank[]

    return _medias
      .map(m => {
        const _ranking = m?.rankings?.find(
          r => r?.context === 'highest rated all time'
        )
        const rank = _ranking ? _ranking.rank : null
        return { ...m, rank } as MediaWithRank
      })
      .sort((a, b) => (a.rank && b.rank ? a.rank - b.rank : 0))
  }, [data?.Page?.media, content.hasRank])

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
        medias={medias}
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

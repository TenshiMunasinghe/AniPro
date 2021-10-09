import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import {
  SearchResultQueryVariables,
  useSearchResultQuery,
} from '../../../generated/index'
import { CardType } from '../../../pages/search/Search'
import { linkToSearchPage } from '../../../utils/linkToSearchPage'
import CardGrid, { MediaWithRank } from '../../common/CardGrid/CardGrid'
import styles from './Content.module.scss'

export type _Content = {
  text: string
  cardType?: CardType
  hasRank?: boolean
}

interface Props {
  queryVar: SearchResultQueryVariables
  content: _Content
}

const Content = ({ queryVar, content }: Props) => {
  const cardType = content.cardType || 'cover'

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

  const link = linkToSearchPage(queryVar)

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
        loadingCount={queryVar.perPage || undefined}
        cardType={cardType}
        imageSize={cardType === 'table' ? 'large' : 'extraLarge'}
        sideScroll={cardType === 'cover'}
      />
    </section>
  )
}

export default Content

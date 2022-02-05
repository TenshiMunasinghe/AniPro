import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import {
  MediaSearchQueryVariables,
  useMediaSearchQuery,
} from '../../generated/index'
import { linkToSearchPage } from '../../utils/linkToSearchPage'
import CardGrid, { MediaWithRank } from '../common/CardGrid'
import { CardType } from '../search/Media/MediaSearchResult/MediaSearchResult'

export type _Content = {
  text: string
  cardType?: CardType
  hasRank?: boolean
}

interface Props {
  queryVar: MediaSearchQueryVariables
  content: _Content
}

const Content = ({ queryVar, content }: Props) => {
  const cardType = content.cardType || 'cover'

  const { data, isLoading, isError } = useMediaSearchQuery(
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
    <section className='flex flex-col'>
      <Link
        to={link}
        className='mb-5 cursor-pointer text-lg font-bold text-zinc-800 hocus:text-teal-500 dark:text-zinc-200 dark:hocus:text-teal-400 lg:mb-8 lg:text-3xl'>
        {content.text}
      </Link>
      <CardGrid
        medias={medias}
        isLoading={isLoading}
        isError={isError}
        loadingCount={queryVar.perPage || undefined}
        cardType={cardType}
        imageSize={cardType === 'table' ? 'large' : 'extraLarge'}
        sideScroll={cardType === 'cover'}
      />
      <Link
        to={link}
        className='ml-auto mt-3 cursor-pointer text-sm font-medium hocus:text-zinc-900 dark:hocus:text-zinc-300 lg:mt-6'>
        View All
      </Link>
    </section>
  )
}

export default Content

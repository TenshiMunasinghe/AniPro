import range from 'lodash/range'
import { DeepPartial } from 'react-hook-form'
import { Maybe, Media } from '../../generated/index'
import { CardType } from '../search/MediaSearchResult'
import CardGridContainer from './CardGridContainer'
import CardChart from './Cards/CardChart/CardChart'
import CardCover from './Cards/CardCover/CardCover'
import CardLoading from './Cards/CardLoading/CardLoading'
import CardTable from './Cards/CardTable/CardTable'
import NotFound from './NotFound/NotFound'

export interface MediaWithRank extends DeepPartial<Media> {
  rank?: number | null
}

export type ImageSize = 'large' | 'extraLarge'

interface Props {
  medias?: Maybe<MediaWithRank>[] | null
  isLoading: boolean
  isError: boolean
  cardType: CardType
  imageSize: ImageSize
  loadingCount?: number
  sideScroll?: boolean
}

const CardGrid = ({
  medias,
  isLoading,
  isError,
  cardType,
  imageSize = 'large',
  loadingCount = 10,
  sideScroll = false,
}: Props) => {
  if (!isLoading && (isError || medias?.length === 0)) {
    return <NotFound />
  }

  return (
    <CardGridContainer cardType={cardType} sideScroll={sideScroll}>
      {isLoading &&
        range(0, loadingCount).map((_, i) => (
          <CardLoading type={cardType} key={i + 'loading-skeleton'} />
        ))}

      {medias &&
        medias.map((m, i) => {
          if (!m) return null

          switch (cardType) {
            case 'cover':
              return (
                <CardCover
                  key={m.id}
                  index={i}
                  rank={m.rank}
                  media={m}
                  imageSize={imageSize}
                />
              )

            case 'table':
              return (
                <CardTable
                  key={m.id}
                  media={m}
                  rank={m.rank}
                  imageSize={imageSize}
                />
              )

            case 'chart':
              return <CardChart key={m.id} media={m} imageSize={imageSize} />

            default:
              return null
          }
        })}
    </CardGridContainer>
  )
}

export default CardGrid

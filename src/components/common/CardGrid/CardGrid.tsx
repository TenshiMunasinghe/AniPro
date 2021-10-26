import classnames from 'classnames'
import range from 'lodash/range'
import { createContext } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import { Maybe, MediaSearchQuery } from '../../../generated/index'
import { CardType } from '../../search/Media/Media'
import CardChart from '../Cards/CardChart/CardChart'
import CardCover from '../Cards/CardCover/CardCover'
import CardLoading from '../Cards/CardLoading/CardLoading'
import CardTable from '../Cards/CardTable/CardTable'
import NotFound from '../NotFound/NotFound'
import styles from './CardGrid.module.scss'

export type Media = NonNullable<
  NonNullable<NonNullable<MediaSearchQuery['Page']>['media']>[number]
>

export interface MediaWithRank extends Media {
  rank?: number | null
}

type ImageSize = 'large' | 'extraLarge'

interface Props extends LazyComponentProps {
  medias?: Maybe<MediaWithRank>[] | null
  isLoading: boolean
  isError: boolean
  cardType: CardType
  imageSize: ImageSize
  loadingCount?: number
  sideScroll?: boolean
}

export const ScrollPositionContext = createContext<ScrollPosition | undefined>(
  undefined
)

export const ImageSizeContext = createContext<ImageSize>('large')

const CardGrid = ({
  medias,
  isLoading,
  isError,
  cardType,
  imageSize = 'large',
  loadingCount = medias?.length || 0,
  sideScroll = false,
  scrollPosition,
}: Props) => {
  if (!isLoading && (isError || medias?.length === 0)) {
    return <NotFound />
  }

  return (
    <ImageSizeContext.Provider value={imageSize}>
      <ScrollPositionContext.Provider value={scrollPosition}>
        <section
          className={classnames(styles.slider, styles[cardType], {
            [styles.sideScroll]: sideScroll,
          })}>
          {isLoading &&
            range(0, loadingCount).map((_, i) => (
              <CardLoading type={cardType} key={i} />
            ))}
          {medias &&
            medias.map((m, i) => {
              if (!m) return null

              switch (cardType) {
                case 'cover':
                  return (
                    <CardCover key={m.id} index={i} rank={m.rank} media={m} />
                  )

                case 'table':
                  return <CardTable key={m.id} media={m} rank={m.rank} />

                case 'chart':
                  return <CardChart key={m.id} media={m} />

                default:
                  return null
              }
            })}
        </section>
      </ScrollPositionContext.Provider>
    </ImageSizeContext.Provider>
  )
}

export default trackWindowScroll(CardGrid)

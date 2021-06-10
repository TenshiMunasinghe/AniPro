import classnames from 'classnames'
import range from 'lodash/range'
import { createContext } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import { FetchedMedias } from '../../../api/types'
import { DEFAULT_PER_PAGE } from '../../../hooks/useFetchSearchResult'
import { CardType } from '../../../pages/search/Search'
import CardChart from '../Cards/CardChart/CardChart'
import CardCover from '../Cards/CardCover/CardCover'
import CardLoading from '../Cards/CardLoading/CardLoading'
import CardTable from '../Cards/CardTable/CardTable'
import NotFound from '../NotFound/NotFound'
import styles from './CardGrid.module.scss'

interface Media extends FetchedMedias {
  rank?: number | null
}

interface Props extends LazyComponentProps {
  medias: Media[] | null
  isLoading: boolean
  isError: boolean
  cardType: CardType
  imageSize: 'large' | 'extraLarge'
  loadingCount?: number
  sideScroll?: boolean
}

export const ScrollPositionContext = createContext<ScrollPosition | undefined>(
  undefined
)

const CardGrid = ({
  medias,
  isLoading,
  isError,
  cardType,
  imageSize,
  loadingCount = medias?.length || DEFAULT_PER_PAGE,
  sideScroll = false,
  scrollPosition,
}: Props) => {
  if (!isLoading && (isError || medias?.length === 0)) {
    return <NotFound />
  }

  return (
    <ScrollPositionContext.Provider value={scrollPosition}>
      <section
        className={classnames(styles.slider, styles[cardType], {
          [styles.sideScroll]: sideScroll,
        })}>
        {medias &&
          medias.map((m, i) => {
            switch (cardType) {
              case 'cover':
                return (
                  <CardCover
                    key={m.id}
                    index={i}
                    id={m.id}
                    image={m.coverImage[imageSize]}
                    color={m.coverImage.color}
                    title={m.title}
                    genres={m.genres}
                    status={m.status}
                    nextAiringEpisode={m.nextAiringEpisode}
                    format={m.format}
                    season={m.season}
                    seasonYear={m.seasonYear}
                    episodes={m.episodes}
                    duration={m.duration}
                    meanScore={m.meanScore}
                    studios={m.studios}
                    rank={m.rank}
                  />
                )

              case 'table':
                return (
                  <CardTable
                    key={m.id}
                    id={m.id}
                    image={{
                      cover: m.coverImage[imageSize],
                      banner: m.bannerImage,
                    }}
                    color={m.coverImage.color}
                    title={m.title}
                    genres={m.genres}
                    status={m.status}
                    nextAiringEpisode={m.nextAiringEpisode}
                    format={m.format}
                    season={m.season}
                    seasonYear={m.seasonYear}
                    episodes={m.episodes}
                    duration={m.duration}
                    meanScore={m.meanScore}
                    studios={m.studios}
                    popularity={m.popularity}
                    rank={m.rank}
                  />
                )

              case 'chart':
                return (
                  <CardChart
                    key={m.id}
                    id={m.id}
                    image={m.coverImage[imageSize]}
                    color={m.coverImage.color}
                    title={m.title}
                    genres={m.genres}
                    description={m.description}
                    meanScore={m.meanScore}
                  />
                )

              default:
                return <></>
            }
          })}
        {isLoading &&
          range(0, loadingCount).map((_, i) => (
            <CardLoading type={cardType} key={i} />
          ))}
      </section>
    </ScrollPositionContext.Provider>
  )
}

export default trackWindowScroll(CardGrid)

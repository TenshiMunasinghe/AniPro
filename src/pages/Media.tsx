import loadable from '@loadable/component'
import { createContext } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import { Route, Switch, useParams } from 'react-router-dom'
import gqlRequestClient from '../api/graphqlClient'
import LoadingSpinner from '../components/common/LoadingSpinner'
import NavBar from '../components/common/NavBar'
import PageWrapper from '../components/common/PageWrapper'
import Aside from '../components/media/Aside/Aside'
import Header from '../components/media/Header/Header'
import { MediaTypes } from '../filterOptions/filterOptions'
import { CommonQuery, useCommonQuery } from '../generated/index'

const Overview = loadable(() => import('../components/media/Overview/Overview'))
const Episodes = loadable(() => import('../components/media/Episodes/Episodes'))
const Characters = loadable(
  () => import('../components/media/People/Characters/Characters')
)
const Staff = loadable(() => import('../components/media/People/Staff/Staff'))
const Reviews = loadable(() => import('../components/media/Reviews/Reviews'))
const Stats = loadable(() => import('../components/media/Stats/Stats'))

export const TAB = [
  'overview',
  'watch',
  'characters',
  'staff',
  'reviews',
  'stats',
] as const

export type TabsType = typeof TAB[number]

export type ParamTypes = {
  id: string
  tab: TabsType
  type: keyof typeof MediaTypes
}

const filterTabs = (data: CommonQuery['Media']) => {
  const tabs = [...TAB]
  const tabsArr: { tab: TabsType; data: any }[] = [
    { tab: 'watch', data: data?.streamingEpisodes },
    { tab: 'staff', data: data?.staff?.edges },
    { tab: 'characters', data: data?.characters?.edges },
    { tab: 'reviews', data: data?.reviews?.nodes },
  ]
  for (const subArr of tabsArr) {
    if (!subArr.data?.length) {
      const idx = tabs.indexOf(subArr.tab as TabsType)
      tabs.splice(idx, 1)
    }
  }
  return tabs
}

export const context = createContext<{ scrollPosition: ScrollPosition }>({
  scrollPosition: { x: 0, y: 0 },
})

const Media = ({ scrollPosition }: LazyComponentProps) => {
  const { id } = useParams<ParamTypes>()
  const { data, isLoading } = useCommonQuery(gqlRequestClient, {
    id: parseInt(id),
  })

  if (isLoading) return <LoadingSpinner />

  if (!data || !data.Media) return null

  const media = data.Media

  return (
    <context.Provider value={{ scrollPosition }}>
      <NavBar />
      <Header
        id={id}
        bannerImg={media.bannerImage}
        coverImg={media.coverImage}
        title={media.title?.romaji}
        format={media.format}
        description={media.description}
        streamUrl={
          (media.streamingEpisodes?.length || -1) > 0
            ? media.streamingEpisodes?.[media.streamingEpisodes?.length - 1]
                ?.url
            : null
        }
        siteUrl={
          media.externalLinks?.find(link => link?.site === 'Official Site')?.url
        }
        tabs={filterTabs(media)}
      />
      <PageWrapper
        className={`grid justify-center gap-8 grid-cols-[var(--media-page-image-width)_1fr]`}>
        <Aside data={media} />
        <Switch>
          <Route exact path='/media/:type/:id'>
            <Overview
              fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
            />
          </Route>
          <Route exact path='/media/:type/:id/watch'>
            <Episodes
              fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
            />
          </Route>
          <Route exact path='/media/:type/:id/characters'>
            <Characters
              fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
            />
          </Route>
          <Route exact path='/media/:type/:id/staff'>
            <Staff
              fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
            />
          </Route>
          <Route exact path='/media/:type/:id/reviews'>
            <Reviews
              fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
            />
          </Route>
          <Route exact path='/media/:type/:id/stats'>
            <Stats
              fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
            />
          </Route>
        </Switch>
      </PageWrapper>
    </context.Provider>
  )
}

export default trackWindowScroll(Media)

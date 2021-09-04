import loadable from '@loadable/component'
import { createContext } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import { Route, Switch, useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner'
import NavBar from '../../components/common/NavBar/NavBar'
import Footer from '../../components/home/Footer/Footer'
import Aside from '../../components/media/Aside/Aside'
import Header from '../../components/media/Header/Header'
import { CommonQuery, useCommonQuery } from '../../generated/index'
import styles from './Media.module.scss'

const Overview = loadable(
  () => import('../../components/media/Overview/Overview')
)
const Episodes = loadable(
  () => import('../../components/media/Episodes/Episodes')
)
const Characters = loadable(
  () => import('../../components/media/People/Characters/Characters')
)
const Staff = loadable(
  () => import('../../components/media/People/Staff/Staff')
)
const Reviews = loadable(() => import('../../components/media/Reviews/Reviews'))
const Stats = loadable(() => import('../../components/media/Stats/Stats'))

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
}

const filterTabs = (data: CommonQuery['Media']) => {
  const tabs = [...TAB]
  const tabsArr: { tab: TabsType; data: any }[] = [
    { tab: 'watch', data: data?.streamingEpisodes },
    { tab: 'staff', data: data?.staff?.edges },
    { tab: 'characters', data: data?.characters?.edges },
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
  const { data } = useCommonQuery(gqlRequestClient, { id: parseInt(id) })

  if (!data || !data.Media) return null

  const media = data.Media

  return (
    <context.Provider value={{ scrollPosition }}>
      <NavBar />
      <div className={styles.container}>
        <Header
          bannerImg={media.bannerImage}
          coverImg={media.coverImage}
          title={media.title?.romaji}
          description={media.description}
          streamUrl={
            (media.streamingEpisodes?.length || -1) > 0
              ? media.streamingEpisodes?.[media.streamingEpisodes?.length - 1]
                  ?.url
              : null
          }
          siteUrl={
            media.externalLinks?.find(link => link?.site === 'Official Site')
              ?.url
          }
          tabs={filterTabs(media)}
        />
        <main className={styles.main}>
          <Aside data={media} />
          <Switch>
            <Route exact path='/media/:id'>
              <Overview
                fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
              />
            </Route>
            <Route exact path='/media/:id/watch'>
              <Episodes
                fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
              />
            </Route>
            <Route exact path='/media/:id/characters'>
              <Characters
                fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
              />
            </Route>
            <Route exact path='/media/:id/staff'>
              <Staff
                fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
              />
            </Route>
            <Route exact path='/media/:id/reviews'>
              <Reviews
                fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
              />
            </Route>
            <Route exact path='/media/:id/stats'>
              <Stats
                fallback={<LoadingSpinner isCenter={{ x: true, y: false }} />}
              />
            </Route>
          </Switch>
        </main>
      </div>
      <Footer />
    </context.Provider>
  )
}

export default trackWindowScroll(Media)

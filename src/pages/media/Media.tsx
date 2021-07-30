import { createContext } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import { Route, Switch, useParams } from 'react-router-dom'
import { Common } from '../../api/types'
import NavBar from '../../components/common/NavBar/NavBar'
import Aside from '../../components/media/Aside/Aside'
import Episodes from '../../components/media/Episodes/Episodes'
import Header from '../../components/media/Header/Header'
import Overview from '../../components/media/Overview/Overview'
import Characters from '../../components/media/People/Characters/Characters'
import Staff from '../../components/media/People/Staff/Staff'
import { useFetchAnimeCommon } from '../../hooks/useFetchAnimeCommon'
import styles from './Media.module.scss'

export const TAB = [
  'overview',
  'watch',
  'characters',
  'staff',
  'stats',
] as const

export type TabsType = typeof TAB[number]

export type ParamTypes = {
  id: string
  tab: TabsType
}

const filterTabs = (data: Common) => {
  const tabs = [...TAB]
  const tabsArr = [
    ['watch', data.streamingEpisodes],
    ['staff', data.staff.edges],
    ['characters', data.characters.edges],
  ]
  for (const subArr of tabsArr) {
    if (subArr[1].length === 0) {
      const idx = tabs.indexOf(subArr[0] as TabsType)
      tabs.splice(idx, 1)
    }
  }
  return tabs
}

export const context = createContext<{ scrollPosition: ScrollPosition }>({
  scrollPosition: { x: 0, y: 0 },
})

/*TODO: Complete media page
tabs:
stats
social
*/
const Media = ({ scrollPosition }: LazyComponentProps) => {
  const { id } = useParams<ParamTypes>()
  const { data } = useFetchAnimeCommon(id)

  if (!data) return null

  return (
    <context.Provider value={{ scrollPosition }}>
      <NavBar />
      <section className={styles.wrapper}>
        <Header
          bannerImg={data.bannerImage}
          coverImg={data.coverImage}
          title={data.title.romaji}
          description={data.description}
          streamUrl={
            data.streamingEpisodes.length > 0
              ? data.streamingEpisodes[data.streamingEpisodes.length - 1].url
              : undefined
          }
          siteUrl={
            data.externalLinks.find(link => link.site === 'Official Site')?.url
          }
          tabs={filterTabs(data)}
        />
        <main className={styles.main}>
          <Aside data={data} />
          <Switch>
            <Route exact path='/media/:id'>
              <Overview />
            </Route>
            <Route exact path='/media/:id/watch'>
              <Episodes />
            </Route>
            <Route exact path='/media/:id/characters'>
              <Characters />
            </Route>
            <Route exact path='/media/:id/staff'>
              <Staff />
            </Route>
          </Switch>
        </main>
      </section>
    </context.Provider>
  )
}

export default trackWindowScroll(Media)

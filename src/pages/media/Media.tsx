import { createContext } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import { useParams } from 'react-router-dom'
import { Overview } from '../../api/types'
import NavBar from '../../components/common/NavBar/NavBar'
import Aside from '../../components/media/Aside/Aside'
import Character from '../../components/media/Character/Character'
import Content from '../../components/media/Content/Content'
import Header from '../../components/media/Header/Header'
import Person from '../../components/media/Person/Person'
import Relation from '../../components/media/Relation/Relation'
import Scores from '../../components/media/Score/Scores'
import Status from '../../components/media/Status/Status'
import { useFetchAnimeDetails } from '../../hooks/useFetchAnimeDetail'
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

const filterTabs = (data: Overview) => {
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
overview
characters
staff
stats
social
*/
const Media = ({ scrollPosition }: LazyComponentProps) => {
  const { id } = useParams<ParamTypes>()
  const { data } = useFetchAnimeDetails(id, 'overview')

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
          <Content heading='Relations'>
            <div className={styles.relations}>
              {data.relations.edges.map(({ node, relationType }) => (
                <Relation
                  key={node.id}
                  id={node.id}
                  image={node.coverImage.large}
                  title={node.title.romaji}
                  format={node.format}
                  status={node.status}
                  relation={relationType}
                />
              ))}
            </div>
          </Content>
          <Content heading='Characters'>
            <div className={styles.characters}>
              {data.characters.edges.map(character => (
                <Character character={character} key={character.node.id} />
              ))}
            </div>
          </Content>
          <Content heading='Staff'>
            <div className={styles.staff}>
              {data.staff.edges.map(staff => (
                <Person
                  name={staff.node.name.full}
                  image={staff.node.image.large}
                  info={staff.role}
                  key={staff.node.id}
                />
              ))}
            </div>
          </Content>
          <Content heading='Status Distribution'>
            <Status
              viewingStatus={data.stats.statusDistribution}
              airingStatus={data.status}
            />
          </Content>
          <Content heading='Score Distribution'>
            <Scores scores={data.stats.scoreDistribution} />
          </Content>
        </main>
      </section>
    </context.Provider>
  )
}

export default trackWindowScroll(Media)

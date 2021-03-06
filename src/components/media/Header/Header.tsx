import htmr from 'htmr'
import { CSSProperties } from 'react'
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa'
import { Overview } from '../../../api/types'
import { TabsType } from '../../../pages/media/Media'
import Tabs from '../Tabs/Tabs'
import styles from './Header.module.scss'

interface Props {
  bannerImg: Overview['bannerImage']
  coverImg: Overview['coverImage']
  title: Overview['title']['romaji']
  description: Overview['description']
  streamUrl?: Overview['streamingEpisodes'][number]['url']
  siteUrl?: Overview['externalLinks'][number]['url']
  tabs: Partial<TabsType>[]
}

const Header = ({
  bannerImg,
  coverImg,
  title,
  description,
  streamUrl,
  siteUrl,
  tabs,
}: Props) => {
  const style = {
    '--banner-image': `url(${bannerImg})`,
    '--bg-color': coverImg.color,
  } as CSSProperties

  return (
    <header className={styles.container} style={style}>
      <div className={styles.banner} />
      <div className={styles.details}>
        <figure className={styles.cover}>
          <img src={coverImg.large} alt={title + ' cover'} />
        </figure>
        <a
          href={streamUrl || siteUrl || '#'}
          target='blank'
          className={styles.button}>
          <span className={styles.text}>
            {streamUrl ? 'Watch' : siteUrl ? 'Official Site' : ''}
          </span>
          {streamUrl ? <FaPlay /> : <FaExternalLinkAlt />}
        </a>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <h5 className={styles.subTitle}>Description</h5>
      <div className={styles.description}>
        <p tabIndex={0}>{htmr(description)}</p>
      </div>
      <Tabs tabs={tabs} />
    </header>
  )
}

export default Header

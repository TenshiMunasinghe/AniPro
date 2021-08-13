import { CSSProperties } from 'react'
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa'
import { Common } from '../../../api/types'
import { TabsType } from '../../../pages/media/Media'
import Description from '../../common/Description/Description'
import TabNav from '../TabNav/TabNav'
import styles from './Header.module.scss'

interface Props {
  bannerImg: Common['bannerImage']
  coverImg: Common['coverImage']
  title: Common['title']['romaji']
  description: Common['description']
  streamUrl?: Common['streamingEpisodes'][number]['url']
  siteUrl?: Common['externalLinks'][number]['url']
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
      <div className={styles.contents}>
        <div className={styles.imageContainer}>
          <figure className={styles.cover}>
            <img src={coverImg.extraLarge} alt={title + ' cover'} />
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
        <div className={styles.details}>
          <h1 className={styles.title}>{title}</h1>
          <h5 className={styles.subTitle}>Description</h5>
          <div className={styles.description}>
            <p tabIndex={0}>
              <Description description={description} />
            </p>
          </div>
        </div>
        <TabNav tabs={tabs} />
      </div>
    </header>
  )
}

export default Header

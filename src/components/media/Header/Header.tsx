import { CSSProperties } from 'react'
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa'
import { NO_IMAGE_URL } from '../../../api/queries'
import { MediaCoverImage } from '../../../generated/index'
import { TabsType } from '../../../pages/media/Media'
import Description from '../../common/Description/Description'
import TabNav from '../TabNav/TabNav'
import styles from './Header.module.scss'

interface Props {
  bannerImg?: string | null
  coverImg?: MediaCoverImage | null
  title?: string | null
  description?: string | null
  streamUrl?: string | null
  siteUrl?: string | null
  tabs: Partial<TabsType>[]
}

const Header = ({
  bannerImg = NO_IMAGE_URL,
  coverImg,
  title,
  description,
  streamUrl,
  siteUrl,
  tabs,
}: Props) => {
  const style = {
    '--banner-image': `url(${bannerImg})`,
    '--bg-color': coverImg?.color,
  } as CSSProperties

  return (
    <header className={styles.container} style={style}>
      <div className={styles.banner} />
      <div className={styles.contents}>
        <div className={styles.imageContainer}>
          <figure className={styles.cover}>
            <img
              src={coverImg?.extraLarge || NO_IMAGE_URL}
              alt={title + ' cover'}
            />
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

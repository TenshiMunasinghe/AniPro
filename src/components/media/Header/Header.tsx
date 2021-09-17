import classnames from 'classnames'
import { CSSProperties } from 'react'
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa'
import { NO_IMAGE_URL } from '../../../api/queries'
import { MediaCoverImage, MediaFormat } from '../../../generated/index'
import { TabsType } from '../../../pages/media/Media'
import Description from '../../common/Description/Description'
import TabNav from '../TabNav/TabNav'
import styles from './Header.module.scss'

interface Props {
  id: string
  bannerImg?: string | null
  coverImg?: MediaCoverImage | null
  title?: string | null
  format?: MediaFormat | null
  description?: string | null
  streamUrl?: string | null
  siteUrl?: string | null
  tabs: Partial<TabsType>[]
}

const Header = ({
  id,
  bannerImg = NO_IMAGE_URL,
  coverImg,
  title,
  format,
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
    <header
      className={classnames(styles.container, {
        [styles.noBanner]: !bannerImg,
      })}
      style={style}>
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
            href={
              streamUrl ||
              siteUrl ||
              `https://anilist.co/${format?.toLowerCase()}/${id}`
            }
            target='blank'
            className={styles.button}>
            <span className={styles.text}>
              {streamUrl ? 'Watch' : siteUrl ? 'Official Site' : 'AniList Site'}
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

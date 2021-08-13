import { CSSProperties } from 'react'
import { Media } from '../../../api/types'
import { adjustColor } from '../../../utils/adjustColor'
import { createColorVariable } from '../../../utils/createColorVariable'
import CoverImage from '../../common/CoverImage/CoverImage'
import Description from '../../common/Description/Description'
import Genres from '../../common/Genres/Genres'
import Title from '../../common/Title/Title'
import styles from './Slide.module.scss'

interface Props {
  media: Media
}

const Slide = ({ media }: Props) => {
  const style = {
    '--cover-image': `url(${media.coverImage.extraLarge})`,
    ...createColorVariable(media.coverImage.color),
    '--color-adjusted': adjustColor(media.coverImage.color, '90%'),
  } as CSSProperties

  return (
    <div className={styles.container} style={style}>
      <div className={styles.coverImage} />
      <div className={styles.content}>
        <div>
          <Title id={media.id} text={media.title.romaji} />
          <div className={styles.description}>
            <Description description={media.description} />
          </div>
        </div>
        <div className={styles.image}>
          <CoverImage
            id={media.id}
            title={media.title.romaji}
            src={media.coverImage.extraLarge}
          />
        </div>
      </div>
      <Genres as='section' genres={media.genres} canInteract />
    </div>
  )
}

export default Slide

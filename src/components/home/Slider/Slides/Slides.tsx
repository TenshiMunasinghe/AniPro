import { memo, MutableRefObject } from 'react'
import { DeepPartial } from 'react-hook-form'
import { Media } from '../../../../generated'
import Slide from '../../Slide/Slide'
import styles from './Slides.module.scss'

interface Props {
  media?: (DeepPartial<Media> | null)[] | null
  setSlide: (slide: number) => void
  slideRefs: MutableRefObject<HTMLDivElement[]>
}

const Slides = ({ media, setSlide, slideRefs }: Props) => {
  if (!media) return null
  return (
    <section className={styles.container}>
      {media.map((media, idx) => (
        <Slide
          media={media}
          key={media?.id}
          index={idx}
          setSlide={setSlide}
          ref={(el: HTMLDivElement) => (slideRefs.current[idx] = el)}
        />
      ))}
    </section>
  )
}

export default memo(Slides)

import classnames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import {
  SearchResultQueryVariables,
  useSearchResultQuery,
} from '../../../generated/index'
import { linkToSearchPage } from '../../../utils/linkToSearchPage'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Slide from '../Slide/Slide'
import styles from './Slider.module.scss'

interface Props {
  queryVar: SearchResultQueryVariables
  context: string
}

const Slider = ({ queryVar, context }: Props) => {
  const { data, isLoading } = useSearchResultQuery(gqlRequestClient, {
    ...queryVar,
    perPage: 5,
  })

  const slideCount = data?.Page?.media?.length || 0

  const [slide, setSlide] = useState(0)

  const slideRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (slideRefs.current.length > 0) {
      slideRefs.current[slide].scrollIntoView({ behavior: 'smooth' })
      slideRefs.current[slide].focus({ preventScroll: true })
    }
  }, [slide])

  const link = linkToSearchPage(queryVar)

  const toNextSlide = useCallback(
    () => setSlide(prev => (prev + 1 >= slideCount ? prev : prev + 1)),
    [slideCount]
  )

  const toPrevSlide = useCallback(
    () => setSlide(prev => (prev - 1 < 0 ? prev : prev - 1)),
    []
  )

  const onKeyPress = useCallback(
    e => {
      if (e.keyCode === 39) {
        toNextSlide()
      } else if (e.keyCode === 37) {
        toPrevSlide()
      }
    },
    [toNextSlide, toPrevSlide]
  )

  return (
    <section className={styles.container} tabIndex={-1} onKeyDown={onKeyPress}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <header className={styles.header}>
            <Link to='/' className={styles.siteName}>
              AniPro
            </Link>
            <div className={styles.context}>{context}</div>
          </header>

          {slideCount && (
            <section className={styles.slides}>
              {data?.Page?.media?.map((media, idx) => (
                <Slide
                  media={media}
                  key={media?.id}
                  index={idx}
                  setSlide={setSlide}
                  ref={slideRefs}
                />
              ))}
            </section>
          )}

          <footer className={styles.footer}>
            <Link to={link} className={styles.link}>
              View All
            </Link>
          </footer>
          <div className={styles.buttons}>
            <button
              onClick={toPrevSlide}
              className={classnames({ [styles.disabled]: slide === 0 })}>
              <FaCaretLeft size='3em' />
            </button>
            <button
              onClick={toNextSlide}
              className={classnames({
                [styles.disabled]: slide === slideCount - 1,
              })}>
              <FaCaretRight size='3em' />
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default Slider

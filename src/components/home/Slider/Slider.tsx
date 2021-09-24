import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import breakpoints from '../../../css/breakpoints.module.scss'
import {
  SearchResultQueryVariables,
  useSearchResultQuery,
} from '../../../generated/index'
import { formatQueryVar } from '../../../utils/formatQueryVar'
import { useWindowSizeStore, WindowSizeStore } from '../../../zustand/stores'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Slide from '../Slide/Slide'
import styles from './Slider.module.scss'

interface Props {
  queryVar: SearchResultQueryVariables
  context: string
}

const windowSizeSelector = ({ width }: WindowSizeStore) => width

const Slider = ({ queryVar, context }: Props) => {
  const windowWidth = useWindowSizeStore(windowSizeSelector)
  const { data, isLoading } = useSearchResultQuery(gqlRequestClient, {
    ...queryVar,
    perPage: 5,
  })

  const slideCount = data?.Page?.media?.length || 0

  const [slide, setSlide] = useState(0)

  const slideRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    slideRefs.current.length > 0 && slideRefs.current[slide].scrollIntoView()
  }, [slide])

  useEffect(() => {
    if (windowWidth >= parseInt(breakpoints.md)) return
    const id = setTimeout(() => {
      setSlide(1)
    }, 2500)

    return () => {
      clearTimeout(id)
    }
  }, [windowWidth])

  const { perPage, ...filterQuery } = formatQueryVar(queryVar)
  const link = `/search?${new URLSearchParams(filterQuery).toString()}`

  const toNextSlide = () =>
    setSlide(prev => (prev + 1 >= slideCount ? prev : prev + 1))
  const toPrevSlide = () => setSlide(prev => (prev - 1 < 0 ? prev : prev - 1))

  return (
    <section className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <header className={styles.header}>
            <Link to='/' className={styles.siteName}>
              AniPro
            </Link>
            <div className={styles.context}>{context}</div>
          </header>
          <section className={styles.slider}>
            {!isLoading &&
              data?.Page?.media &&
              data.Page.media.length > 0 &&
              (data?.Page?.media?.map((media, idx, arr) =>
                media ? (
                  <Slide
                    media={media}
                    key={media.id}
                    ref={(el: HTMLDivElement) => (slideRefs.current[idx] = el)}
                  />
                ) : null
              ) ||
                null)}
          </section>
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

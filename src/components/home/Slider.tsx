import classnames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import {
  MediaSearchQueryVariables,
  useMediaSearchQuery,
} from '../../generated/index'
import { linkToSearchPage } from '../../utils/linkToSearchPage'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner'
import Slide from './Slide'

interface Props {
  queryVar: MediaSearchQueryVariables
  context: string
}

const Slider = ({ queryVar, context }: Props) => {
  const { data, isLoading } = useMediaSearchQuery(gqlRequestClient, {
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

  const buttonStyle = {
    disabled: 'cursor-default opacity-40',
    active: 'hover:text-emerald-400 focus:text-emerald-400',
  }

  return (
    <section
      className='flex items-center relative bg-gray-800 min-w-full h-screen'
      tabIndex={-1}
      onKeyDown={onKeyPress}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <header className='absolute top-0 flex justify-between w-full p-6 z-20'>
            <Link to='/'>AniPro</Link>
            <div className='text-sm'>{context}</div>
          </header>

          {slideCount && (
            <section className='flex z-10 overflow-hidden'>
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

          <footer className='absolute right-5 bottom-5 z-20 text-teal-400 hover:underline'>
            <Link to={link}>View All</Link>
          </footer>

          <div className='absolute left-4 bottom-4 z-10 md:left-1/2 md:-translate-x-1/2'>
            <button
              onClick={toPrevSlide}
              className={classnames({
                [buttonStyle.disabled]: slide === 0,
                [buttonStyle.active]: slide !== 0,
              })}>
              <FaCaretLeft size='3em' />
            </button>
            <button
              onClick={toNextSlide}
              className={classnames({
                [buttonStyle.disabled]: slide === slideCount - 1,
                [buttonStyle.active]: slide !== slideCount - 1,
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

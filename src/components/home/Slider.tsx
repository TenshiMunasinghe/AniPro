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
import LoadingSpinner from '../common/LoadingSpinner'
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
    active: 'hocus:text-zinc-900 dark:hocus:text-zinc-300',
  }

  return (
    <section
      className='flex items-center relative min-w-full h-screen'
      tabIndex={-1}
      onKeyDown={onKeyPress}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <header className='absolute top-0 flex justify-between items-center w-full p-4 sm:p-6 lg:py-10 lg:px-14 z-20'>
            <Link
              to='/'
              className='font-bold text-lg lg:text-2xl text-zinc-800 dark:text-zinc-200'>
              AniPro
            </Link>
            <Link to={link} className='text-sm dark:text-zinc-300'>
              {context}
            </Link>
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

          <footer className='absolute right-4 bottom-4 sm:right-6 sm:bottom-6 lg:bottom-10 lg:right-20 z-20 font-semibold hocus:underline hocus:text-zinc-800 hocus:dark:text-zinc-300'>
            <Link to={link}>View All</Link>
          </footer>

          <div className='absolute left-4 bottom-4 z-10 md:left-1/2 md:-tranzinc-x-1/2 sm:bottom-6'>
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

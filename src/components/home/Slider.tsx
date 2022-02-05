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
    disabled: 'cursor-default opacity-30',
    active:
      'text-zinc-500 dark:text-zinc-400 hocus:text-zinc-900 dark:hocus:text-zinc-300',
  }

  return (
    <section
      className='relative flex h-screen min-w-full items-center'
      tabIndex={-1}
      onKeyDown={onKeyPress}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <header className='absolute top-0 z-20 flex w-full items-center justify-between p-4 sm:p-6 lg:py-10 lg:px-14'>
            <Link
              to='/'
              className='text-lg text-zinc-900 dark:text-zinc-300 lg:text-2xl'>
              AniPro
            </Link>
            <Link
              to={link}
              className='text-sm hocus:text-zinc-800 dark:hocus:text-zinc-200'>
              {context}
            </Link>
          </header>

          {slideCount && (
            <section className='z-10 flex overflow-hidden'>
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

          <footer className='absolute right-4 bottom-4 z-20 hocus:text-teal-600 dark:text-zinc-200 hocus:dark:text-teal-300 sm:right-6 sm:bottom-6 lg:bottom-10 lg:right-20'>
            <Link to={link}>View All</Link>
          </footer>

          <div className='md:-tranzinc-x-1/2 absolute left-4 bottom-4 z-10 sm:bottom-6 md:left-1/2'>
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

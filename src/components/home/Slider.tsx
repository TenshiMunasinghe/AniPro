import { useEffect, useRef } from 'react'
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

  const ref = useRef<HTMLElement | null>(null)

  const link = linkToSearchPage(queryVar)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <section
      className='relative flex h-screen min-w-full items-center'
      tabIndex={-1}
      ref={ref}>
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

          {!!data?.Page?.media?.length && (
            <section className='z-10 flex snap-x snap-mandatory overflow-x-auto'>
              {data?.Page?.media?.map(media => (
                <Slide media={media} ref={ref} key={media?.id} />
              ))}
            </section>
          )}

          <footer className='absolute right-4 bottom-4 z-20 hocus:text-teal-600 dark:text-zinc-200 hocus:dark:text-teal-300 sm:right-6 sm:bottom-6 lg:bottom-10 lg:right-20'>
            <Link to={link}>View All</Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default Slider

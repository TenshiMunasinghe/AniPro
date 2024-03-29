import classnames from 'classnames'
import htmr from 'htmr'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

interface Props {
  description: string | null | undefined
}

const Description = ({ description }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflow, setIsOverflow] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spoilers = ref.current?.querySelectorAll('.markdown_spoiler')

    spoilers?.forEach(element => {
      element?.addEventListener('click', () =>
        element.classList.toggle('show_spoiler')
      )
    })
  }, [])

  useLayoutEffect(() => {
    if (!ref.current || !ref.current.parentElement) {
      return
    }

    const isOverflow =
      ref.current.clientHeight > ref.current.parentElement.clientHeight

    setIsOverflow(isOverflow)
  }, [])

  const formattedDescription = useMemo(
    () =>
      description
        ?.replaceAll('https://anilist.co', '')
        .replaceAll('/anime/', '/media/anime/')
        .replaceAll('/manga/', '/media/manga/')
        .replaceAll('~!', '')
        .replaceAll('!~', ''),
    [description]
  )

  const toggleExpansion = () => setIsExpanded(prev => !prev)

  return (
    <div
      className={classnames(
        'group relative max-h-80 space-y-4 overflow-hidden',
        {
          'max-h-fit': isExpanded || !isOverflow,
        }
      )}>
      <div
        className='prose prose-zinc prose-a:text-teal-600 dark:prose-invert dark:prose-a:text-teal-400 lg:prose-lg xl:prose-xl'
        ref={ref}>
        {htmr(formattedDescription || '<i>no description</i>')}
      </div>
      {isOverflow && (
        <button
          onClick={toggleExpansion}
          className={classnames(
            'w-full py-2 text-center transition-colors hocus:text-teal-600 dark:hocus:text-teal-400',
            {
              'absolute bottom-0 bg-gradient-to-t from-white to-transparent dark:from-zinc-800':
                !isExpanded,
            }
          )}>
          Show {isExpanded ? 'less' : 'more'}
        </button>
      )}
    </div>
  )
}

export default Description

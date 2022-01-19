import classnames from 'classnames'
import htmr from 'htmr'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './Description.module.scss'

interface Props {
  description: string | null | undefined
}

const Description = ({ description }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflow, setIsOverflow] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  const toggleExpansion = () => setIsExpanded(prev => !prev)

  useEffect(() => {
    const spoilers = ref.current?.querySelectorAll('.markdown_spoiler')

    const toggleSpoiler = (element: Element) => {
      element.classList.toggle(styles.showSpoiler)
    }

    spoilers?.forEach(node => {
      const parent = node.parentElement
      parent?.classList.add(styles.spoiler)
      parent?.addEventListener('click', () => toggleSpoiler(parent))
    })
  }, [])

  useLayoutEffect(() => {
    const isOverflow =
      ref.current &&
      ref.current.parentElement &&
      ref.current?.clientHeight > ref.current?.parentElement?.clientHeight

    setIsOverflow(isOverflow || false)
  }, [])

  const formattedDescription = useMemo(
    () =>
      description
        ?.replaceAll('https://anilist.co', '')
        .replaceAll('/anime/', '/media/anime/')
        .replaceAll('/manga/', '/media/manga/'),
    [description]
  )

  return (
    <div
      className={classnames(styles.container, {
        [styles.expanded]: isExpanded || !isOverflow,
      })}>
      <div className={styles.description} ref={ref}>
        {htmr(formattedDescription || '<i>no description</i>')}
      </div>
      {isOverflow && (
        <button onClick={toggleExpansion} className={styles.toggleExpansion}>
          Show {isExpanded ? 'less' : 'more'}
        </button>
      )}
    </div>
  )
}

export default Description

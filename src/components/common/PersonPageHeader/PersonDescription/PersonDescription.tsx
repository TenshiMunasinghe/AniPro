import classnames from 'classnames'
import htmr from 'htmr'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import styles from './PersonDescription.module.scss'

interface Props {
  description: string | null | undefined
}

const PersonDescription = ({ description }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflow, setIsOverflow] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  const toggleExpansion = () => setIsExpanded(prev => !prev)

  useEffect(() => {
    const spoilers = ref.current?.querySelectorAll('.' + styles.spoiler)

    const toggleSpoiler = (node: Element) => {
      node.classList.toggle(styles.showSpoiler)
    }

    spoilers?.forEach(node => {
      node.addEventListener('click', () => toggleSpoiler(node))
    })
  }, [])

  useLayoutEffect(() => {
    const isOverflow =
      ref.current &&
      ref.current.parentElement &&
      ref.current?.clientHeight > ref.current?.parentElement?.clientHeight

    setIsOverflow(isOverflow || false)
  }, [])

  if (!description) return null

  const htmlString = renderToString(
    <ReactMarkdown>
      {description.replaceAll('~!', `#$`).replaceAll('!~', '$#')}
    </ReactMarkdown>
  )

  const formattedDescription = htmlString
    .replaceAll('#$', `<p class='${styles.spoiler}'><span>`)
    .replaceAll('$#', '</span></p>')
    .replaceAll('\n', '<br/>')
    .replaceAll('https://anilist.co', '')

  return (
    <div
      className={classnames(styles.container, {
        [styles.expanded]: isExpanded || !isOverflow,
      })}>
      <div className={styles.description} ref={ref}>
        {htmr(formattedDescription)}
      </div>
      {isOverflow && (
        <button onClick={toggleExpansion} className={styles.toggleExpansion}>
          Show {isExpanded ? 'less' : 'more'}
        </button>
      )}
    </div>
  )
}

export default PersonDescription

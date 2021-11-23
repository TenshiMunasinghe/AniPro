import htmr from 'htmr'
import { useEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import styles from './PersonDescription.module.scss'

interface Props {
  description: string | null | undefined
}

const PersonDescription = ({ description }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const spoilers = ref.current?.querySelectorAll('.' + styles.spoiler)

    const toggleSpoiler = (node: Element) => {
      node.classList.toggle(styles.showSpoiler)
      if (node.getAttribute('title')) {
        node.removeAttribute('title')
      } else {
        node.setAttribute('title', 'Hide spoiler')
      }
    }

    spoilers?.forEach(node => {
      node.addEventListener('click', () => toggleSpoiler(node))
    })
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
    .replaceAll('https://anilist.co', '')

  return (
    <div className={styles.container} ref={ref}>
      {htmr(formattedDescription)}
    </div>
  )
}

export default PersonDescription

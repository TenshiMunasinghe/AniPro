import classnames from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { MediaTag } from '../../../../generated/index'
import styles from './Tags.module.scss'

interface Props {
  tags: (MediaTag | null)[]
}

const Tags = ({ tags }: Props) => {
  const [showSpoiler, setShowSpoiler] = useState(false)

  const tagsArr = showSpoiler
    ? tags
    : tags.filter(tag => !tag?.isGeneralSpoiler && !tag?.isMediaSpoiler)

  const spoilerTags = tags.filter(
    tag => tag?.isGeneralSpoiler || tag?.isMediaSpoiler
  )

  return (
    <section className={styles.container}>
      <h6 className={styles.heading}>Tags</h6>
      <ul className={styles.tags}>
        {tagsArr.map(tag =>
          !tag ? null : (
            <li
              key={tag.id}
              className={classnames(styles.tag, {
                [styles.spoiler]: tag.isGeneralSpoiler || tag.isMediaSpoiler,
              })}>
              <Link to={`/search?tags=${tag.name.replace(' ', '+')}`}>
                <span
                  className={styles.tagName}
                  data-tip
                  data-for={tag.id.toString()}>
                  {tag.name}
                </span>
                <span>{tag.rank}%</span>
              </Link>
              {tag.id && (
                <ReactTooltip id={tag.id.toString()} effect='solid' multiline>
                  <p style={{ maxWidth: '55ch' }}>{tag.description}</p>
                </ReactTooltip>
              )}
            </li>
          )
        )}
      </ul>
      {spoilerTags.length && (
        <button
          className={styles.button}
          onClick={() => setShowSpoiler(prev => !prev)}>
          {showSpoiler ? 'Hide' : 'Show'} {spoilerTags.length}{' '}
          {spoilerTags.length > 1 ? 'spoilers' : 'spoiler'}
        </button>
      )}
    </section>
  )
}

export default Tags

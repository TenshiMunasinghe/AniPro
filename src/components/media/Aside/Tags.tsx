import classnames from 'classnames'
import { useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { MediaTypes } from '../../../filterOptions/filterOptions'
import { MediaTag, MediaType } from '../../../generated/index'
import { ParamTypes } from '../../../pages/Media'
import { linkToSearchPage } from '../../../utils/linkToSearchPage'
import LinkButton from '../../common/Link/LinkButton'

interface Props {
  tags: (MediaTag | null)[]
}

const Tags = ({ tags }: Props) => {
  const [showSpoiler, setShowSpoiler] = useState(false)
  const { type } = useParams<ParamTypes>()

  const tagsArr = showSpoiler
    ? tags
    : tags.filter(tag => !tag?.isGeneralSpoiler && !tag?.isMediaSpoiler)

  const spoilerTags = tags.filter(
    tag => tag?.isGeneralSpoiler || tag?.isMediaSpoiler
  )

  return (
    <section className='space-y-4 text-sm'>
      <h6 className='text-base'>Tags</h6>
      <ul className='space-y-4'>
        {tagsArr.map(tag =>
          !tag ? null : (
            <li
              key={tag.id}
              className={classnames('rounded bg-zinc-700 p-3', {
                'text-red-600 dark:text-red-400':
                  tag.isGeneralSpoiler || tag.isMediaSpoiler,
              })}>
              <RouterLink
                to={linkToSearchPage(
                  { tags: [tag.name] },
                  MediaTypes[type] || MediaType.Anime
                )}
                className='group flex items-center justify-between'>
                <span
                  className='group-hover:text-teal-600 group-focus:text-teal-600 dark:group-hover:text-teal-400 dark:group-focus:text-teal-400'
                  data-tip
                  data-for={tag.id.toString()}>
                  {tag.name}
                </span>
                <span>{tag.rank}%</span>
              </RouterLink>
              {tag.id && (
                <ReactTooltip id={tag.id.toString()} effect='solid' multiline>
                  <p style={{ maxWidth: '55ch', color: 'var(--white-600)' }}>
                    {tag.description}
                  </p>
                </ReactTooltip>
              )}
            </li>
          )
        )}
      </ul>
      {!!spoilerTags.length && (
        <LinkButton onClick={() => setShowSpoiler(prev => !prev)}>
          {showSpoiler ? 'Hide' : 'Show'} {spoilerTags.length}
          {' spoiler '}
          {spoilerTags.length > 1 ? 'tags' : 'tag'}
        </LinkButton>
      )}
    </section>
  )
}

export default Tags

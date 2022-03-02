import classnames from 'classnames'
import { Link as RouterLink, useParams } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { MediaTypes } from '../../filterOptions/filterOptions'
import { MediaTag, MediaType } from '../../generated'
import { ParamTypes } from '../../pages/Media'
import { linkToSearchPage } from '../../utils/linkToSearchPage'

interface Props {
  tag: MediaTag | null
}

const Tag = ({ tag }: Props) => {
  const { type } = useParams<ParamTypes>()

  if (!tag) return null

  return (
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
}

export default Tag

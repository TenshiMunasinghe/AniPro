import { useState } from 'react'
import { MediaTag } from '../../../generated/index'
import LinkButton from '../../common/Link/LinkButton'
import Tag from '../Tag'

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
    <section className='space-y-4 text-sm'>
      <h6 className='text-base'>Tags</h6>
      <ul className='space-y-4'>
        {tagsArr.map(tag => (
          <Tag key={tag?.id} tag={tag} />
        ))}
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

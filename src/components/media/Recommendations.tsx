import { useState } from 'react'
import { DeepPartial } from 'react-hook-form'
import { RecommendationConnection } from '../../generated/index'
import CardCover from '../common/Cards/CardCover/CardCover'
import LinkButton from '../common/Link/LinkButton'
import Content from './Content'

interface Props {
  recommendations: DeepPartial<RecommendationConnection['nodes']>
}

const Recommendations = ({ recommendations }: Props) => {
  const [showAll, setShowAll] = useState(false)

  if (!recommendations) return null

  const toggleShowAll = () => setShowAll(prev => !prev)

  return (
    <Content
      heading={
        <div className='flex justify-between'>
          Recommendation
          {recommendations.length > 5 && (
            <LinkButton className='text-sm' onClick={toggleShowAll}>
              {showAll
                ? 'View less'
                : `View all ${recommendations.length} recommendations`}
            </LinkButton>
          )}
        </div>
      }>
      <div className='grid w-full auto-cols-[10rem] grid-flow-col grid-cols-none grid-rows-1 gap-x-4 overflow-x-auto lg:grid-flow-row lg:grid-cols-5 lg:gap-5 lg:space-x-0'>
        {(showAll ? recommendations : recommendations.slice(0, 5)).map(
          (node, index) => {
            if (!node) return null
            const { mediaRecommendation: m } = node
            if (!m || !m.id) return null
            return (
              <CardCover
                index={index}
                media={m}
                hasPopover={false}
                key={node.id}
                imageSize='large'
              />
            )
          }
        )}
      </div>
    </Content>
  )
}

export default Recommendations

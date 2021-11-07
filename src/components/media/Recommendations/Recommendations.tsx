import { useState } from 'react'
import { DeepPartial } from 'react-hook-form'
import breakpoints from '../../../css/breakpoints.module.scss'
import { RecommendationConnection } from '../../../generated/index'
import { useWindowSizeStore, WindowSizeStore } from '../../../zustand/stores'
import CardCover from '../../common/Cards/CardCover/CardCover'
import Content from '../Content/Content'
import styles from './Recommendations.module.scss'

interface Props {
  recommendations: DeepPartial<RecommendationConnection['nodes']>
}

const windowSizeSelector = ({ width }: WindowSizeStore) => width

const Recommendations = ({ recommendations }: Props) => {
  const windowWidth = useWindowSizeStore(windowSizeSelector)
  const [showAll, setShowAll] = useState(false)

  if (!recommendations) return null

  const toggleShowAll = () => setShowAll(prev => !prev)

  return (
    <Content
      heading={
        <div className={styles.heading}>
          Recommendation
          <button className={styles.showAll} onClick={toggleShowAll}>
            {showAll
              ? 'View less'
              : `View all ${recommendations.length} recommendations`}
          </button>
        </div>
      }>
      <div className={styles.container}>
        {(showAll || windowWidth < parseInt(breakpoints.md)
          ? recommendations
          : recommendations.slice(0, 5)
        ).map((node, index) => {
          if (!node) return null
          const { mediaRecommendation: m } = node
          if (!m || !m.id) return null
          return (
            <CardCover
              index={index}
              media={m}
              hasPopover={false}
              key={'recommendations' + m.id}
            />
          )
        })}
      </div>
    </Content>
  )
}

export default Recommendations

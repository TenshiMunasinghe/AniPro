import { useState } from 'react'
import { DeepPartial } from 'react-hook-form'
import { linkToMediaPage } from '../../../App'
import breakpoints from '../../../css/breakpoints.module.scss'
import { MediaType, RecommendationConnection } from '../../../generated/index'
import { useWindowSizeStore, WindowSizeStore } from '../../../zustand/stores'
import CoverImage from '../../common/CoverImage/CoverImage'
import Title from '../../common/Title/Title'
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
        ).map(node => {
          if (!node) return null
          const { mediaRecommendation: m } = node
          if (!m || !m.id) return null
          return (
            <div className={styles.cardCover} key={'recommendations' + m.id}>
              <CoverImage
                link={linkToMediaPage(m.id, m.type || MediaType.Anime)}
                src={m.coverImage?.large}
                title={m.title?.romaji}
                type={m.type || null}
              />
              <Title
                id={m.id}
                text={m.title?.romaji || 'no title'}
                type={m.type || null}
              />
            </div>
          )
        })}
      </div>
    </Content>
  )
}

export default Recommendations

import classnames from 'classnames'
import { useHistory, useParams } from 'react-router-dom'
import { ParamTypes, TabsType } from '../../../pages/media/Media'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './TabNav.module.scss'

interface Props {
  tabs: Partial<TabsType>[]
}

const TabNav = ({ tabs }: Props) => {
  const { id, tab } = useParams<ParamTypes>()
  const history = useHistory()

  const switchTab = (tab: TabsType) =>
    history.push(`/media/${id}/${tab === 'overview' ? '' : tab}`)

  return (
    <nav className={styles.tabs}>
      {tabs.map(t => (
        <button
          className={classnames(styles.tab, {
            [styles.active]: t === (tab || 'overview'),
          })}
          onClick={() => switchTab(t)}
          key={t}>
          {toStartCase(t)}
        </button>
      ))}
    </nav>
  )
}

export default TabNav

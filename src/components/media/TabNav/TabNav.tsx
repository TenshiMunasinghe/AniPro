import { useHistory, useParams } from 'react-router-dom'
import { ParamTypes, TabsType } from '../../../pages/media/Media'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './TabNav.module.scss'

interface Props {
  tabs: Partial<TabsType>[]
}

const TabNav = ({ tabs }: Props) => {
  const { id } = useParams<ParamTypes>()
  const history = useHistory()

  const switchTab = (tab: TabsType) =>
    history.push(`/media/${id}/${tab === 'overview' ? '' : tab}`)

  return (
    <nav className={styles.tabs}>
      {tabs.map(tab => (
        <button className={styles.tab} onClick={() => switchTab(tab)} key={tab}>
          {toStartCase(tab)}
        </button>
      ))}
    </nav>
  )
}

export default TabNav

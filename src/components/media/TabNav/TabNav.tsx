import classnames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import { ParamTypes, TabsType } from '../../../pages/media/Media'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './TabNav.module.scss'

interface Props {
  tabs: Partial<TabsType>[]
}

const TabNav = ({ tabs }: Props) => {
  const { id, tab } = useParams<ParamTypes>()

  return (
    <nav className={styles.tabs}>
      {tabs.map(t => (
        <Link
          className={classnames(styles.tab, {
            [styles.active]: t === (tab || 'overview'),
          })}
          to={`/media/${id}/${t === 'overview' ? '' : t}`}
          key={t}>
          {toStartCase(t)}
        </Link>
      ))}
    </nav>
  )
}

export default TabNav

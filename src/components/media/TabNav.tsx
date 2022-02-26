import classnames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import { ParamTypes, TabsType } from '../../pages/Media'
import { toStartCase } from '../../utils/toStartCase'

interface Props {
  tabs: Partial<TabsType>[]
}

const TabNav = ({ tabs }: Props) => {
  const { id, tab, type } = useParams<ParamTypes>()

  return (
    <nav className='flex space-x-4 sm:justify-evenly sm:overflow-x-auto'>
      {tabs.map(t => (
        <Link
          className={classnames(
            'relative border-b-2 border-zinc-500 px-2 transition-all hocus:border-zinc-800 dark:border-zinc-400 dark:hocus:border-zinc-200',
            {
              'border-teal-600 dark:border-teal-400': t === (tab || 'overview'),
            }
          )}
          to={`/media/${type}/${id}/${t === 'overview' ? '' : t}`}
          key={t}>
          {toStartCase(t)}
        </Link>
      ))}
    </nav>
  )
}

export default TabNav

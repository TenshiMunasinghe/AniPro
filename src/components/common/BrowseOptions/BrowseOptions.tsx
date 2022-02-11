import { useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { SEARCH_SLUGS } from '../../../pages/Search'
import Dropdown from '../Dropdown/Dropdown'
import styles from './BrowseOptions.module.scss'

//TODO: do something better

const BrowseOptions = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  const onChange = useCallback(
    (state: string | string[]) => {
      if (typeof state === 'string') {
        history.push(`/search/${state}`)
      }
    },
    [history]
  )

  const pathArr = pathname.split('/')
  const current = pathArr[1] === 'search' ? pathArr[2] : ''

  const options = useMemo(
    () =>
      SEARCH_SLUGS.map(slug => ({
        label: slug,
        value: slug,
      })),
    []
  )

  return (
    <div className={styles.container}>
      <span>Browse</span>
      <Dropdown
        options={options}
        onChange={onChange}
        selected={current}
        placeholder='something'
      />
    </div>
  )
}

export default BrowseOptions

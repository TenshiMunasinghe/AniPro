import { useLocation } from 'react-router-dom'
import SearchBarInput from '../../common/SearchBarInput/SearchBarInput'
import styles from './PeopleHeader.module.scss'

interface Props {
  heading: string
  link?: string
}

const PeopleHeader = ({ heading, link }: Props) => {
  const location = useLocation()

  return (
    <div className={styles.container}>
      <h5 className={styles.heading}>{heading}</h5>
      <SearchBarInput
        link={link}
        placeholder={`search ${location.pathname.split('/')[2]}`}
      />
    </div>
  )
}

export default PeopleHeader

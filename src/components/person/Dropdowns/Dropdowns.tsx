import Dropdown, { DropdownProps } from '../../common/Dropdown/Dropdown'
import styles from './Dropdowns.module.scss'

interface Props {
  dropdowns: DropdownProps[]
}

const Dropdowns = ({ dropdowns }: Props) => {
  return (
    <div className={styles.container}>
      {dropdowns.map((prop, idx) => (
        <Dropdown key={idx.toString() + prop.options.toString()} {...prop} />
      ))}
    </div>
  )
}

export default Dropdowns

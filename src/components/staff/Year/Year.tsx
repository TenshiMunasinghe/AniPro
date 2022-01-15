import styles from './Year.module.scss'

interface Props {
  year: number | string
}

const Year = ({ year }: Props) => {
  return <h6 className={styles.year}>{year}</h6>
}

export default Year

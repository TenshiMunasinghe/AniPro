import styles from './Info.module.scss'

interface Props {
  main: () => string | JSX.Element | null
  sub: () => string | JSX.Element | null
}

const Info = ({ main, sub }: Props) => {
  return (
    <section className={styles.container}>
      <div className={styles.main}>{main()}</div>
      <div className={styles.sub}>{sub()}</div>
    </section>
  )
}

export default Info

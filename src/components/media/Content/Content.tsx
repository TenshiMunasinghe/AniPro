import { FC } from 'react'
import styles from './Content.module.scss'

interface Props {
  heading: string
}

const Content: FC<Props> = ({ heading, children }) => {
  return (
    <section className={styles.container}>
      <h6>{heading}</h6>
      {children}
    </section>
  )
}

export default Content

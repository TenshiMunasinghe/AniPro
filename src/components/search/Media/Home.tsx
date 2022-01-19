import Content from '../../../components/home/Content/Content'
import { MediaType } from '../../../generated'
import { useMediaHomeContent } from '../../../hooks/useMediaHomeContent'
import styles from './Home.module.scss'

interface Props {
  type: MediaType
}

const Home = ({ type }: Props) => {
  const { contents, isLargeScreen } = useMediaHomeContent()

  return (
    <main className={styles.container}>
      {Object.keys(contents[type]).map(key => {
        const content = contents[type][key]
        const { queryVars } = content
        return (
          <Content
            key={key}
            content={content}
            queryVar={{
              ...queryVars,
              perPage: queryVars.perPage || (isLargeScreen ? 5 : 10),
              type,
            }}
          />
        )
      })}
    </main>
  )
}

export default Home

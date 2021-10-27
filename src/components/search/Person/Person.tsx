import {
  SearchCharactersQuery,
  SearchStaffQuery,
} from '../../../generated/index'
import CoverImage from '../../common/CoverImage/CoverImage'
import styles from './Person.module.scss'

type Props =
  | NonNullable<NonNullable<SearchStaffQuery['Page']>['staff']>[number]
  | NonNullable<
      NonNullable<SearchCharactersQuery['Page']>['characters']
    >[number]

const Person = (props: Props) => {
  if (!props) return null

  const { name, image } = props

  return (
    <div className={styles.container}>
      <CoverImage src={image?.large} title={name?.full} />
      <div className={styles.name}>{name?.full}</div>
    </div>
  )
}

export default Person

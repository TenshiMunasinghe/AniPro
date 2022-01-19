import { linkToCharacterPage, linkToStaffPage } from '../../../App'
import {
  SearchCharactersQuery,
  SearchStaffQuery,
} from '../../../generated/index'
import Card from '../../common/Cards/CardCover/Content/Content'

type Props =
  | NonNullable<NonNullable<SearchStaffQuery['Page']>['staff']>[number]
  | NonNullable<
      NonNullable<SearchCharactersQuery['Page']>['characters']
    >[number]

const Person = (props: Props) => {
  if (!props) return null

  const { name, image, id } = props

  const link =
    props.__typename === 'Character'
      ? linkToCharacterPage(id)
      : linkToStaffPage(id)

  return <Card main={{ title: name?.full, image: image?.large, link }} />
}

export default Person

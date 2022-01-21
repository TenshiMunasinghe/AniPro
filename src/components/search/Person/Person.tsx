import { linkToCharacterPage, linkToStaffPage } from '../../../App'
import {
  SearchCharactersQuery,
  SearchStaffQuery,
} from '../../../generated/index'
import Card from '../../common/Cards/CardCover/Content/Content'

type Props = {
  person:
    | NonNullable<NonNullable<SearchStaffQuery['Page']>['staff']>[number]
    | NonNullable<
        NonNullable<SearchCharactersQuery['Page']>['characters']
      >[number]
  type: 'character' | 'staff'
}

const Person = ({ person, type }: Props) => {
  if (!person) return null

  const { name, image, id } = person

  const link =
    type === 'character' ? linkToCharacterPage(id) : linkToStaffPage(id)

  return <Card main={{ title: name?.full, image: image?.large, link }} />
}

export default Person

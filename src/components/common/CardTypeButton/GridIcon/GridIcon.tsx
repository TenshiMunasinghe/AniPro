import { FaTh, FaThLarge, FaThList } from 'react-icons/fa'
import { CardType } from '../../../../pages/search/Search'

interface Props {
  cardType: CardType
}

const GridIcon = ({ cardType }: Props) => {
  switch (cardType) {
    case 'chart':
      return <FaThLarge aria-label={cardType} />

    case 'cover':
      return <FaTh aria-label={cardType} />

    case 'table':
      return <FaThList aria-label={cardType} />
  }
}

export default GridIcon

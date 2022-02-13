import classnames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { CardType } from '../search/MediaSearchResult'
import GridIcon from './GridIcon'

interface Props {
  cardType: CardType
  isActive: boolean
  setCardType: Dispatch<SetStateAction<CardType>>
}

const CardTypeButton = ({ cardType, isActive, setCardType }: Props) => {
  return (
    <button
      onClick={() => setCardType(cardType)}
      className={classnames(
        'center flex p-1 transition-all hocus:text-zinc-500 dark:hocus:text-zinc-100',
        { 'text-teal-500': isActive }
      )}>
      <GridIcon cardType={cardType} />
    </button>
  )
}

export default CardTypeButton

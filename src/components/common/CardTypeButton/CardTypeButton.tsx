import classnames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { CardType } from '../../search/Media/MediaSearchResult/MediaSearchResult'
import styles from './CardTypeButton.module.scss'
import GridIcon from './GridIcon/GridIcon'

interface Props {
  cardType: CardType
  isActive: boolean
  setCardType: Dispatch<SetStateAction<CardType>>
}

const CardTypeButton = ({ cardType, isActive, setCardType }: Props) => {
  return (
    <button
      onClick={() => setCardType(cardType)}
      className={classnames(styles.button, { [styles.active]: isActive })}>
      <GridIcon cardType={cardType} />
    </button>
  )
}

export default CardTypeButton

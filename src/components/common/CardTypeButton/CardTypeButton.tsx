import React, { Dispatch, SetStateAction } from 'react'

import styles from './CardTypeButton.module.scss'
import { CardType } from '../../../pages/search/Search'
import GridIcon from '../GridIcon/GridIcon'

interface Props {
  cardType: CardType
  isActive: boolean
  setCardType: Dispatch<SetStateAction<CardType>>
}

const CardTypeButton = ({ cardType, isActive, setCardType }: Props) => {
  return (
    <button
      onClick={() => setCardType(cardType)}
      className={styles.button + (isActive ? ` ${styles.active}` : '')}>
      <GridIcon cardType={cardType} />
    </button>
  )
}

export default CardTypeButton

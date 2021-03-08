import classnames from 'classnames'
import React, { Dispatch, SetStateAction } from 'react'

import { CardType } from '../../../pages/search/Search'
import GridIcon from '../GridIcon/GridIcon'
import styles from './CardTypeButton.module.scss'

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

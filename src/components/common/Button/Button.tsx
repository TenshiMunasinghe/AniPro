import { FC } from 'react'
import ButtonWrapper, { ButtonProps } from './index'

interface Props extends ButtonProps {
  onClick: () => void
}

const Button: FC<Props> = props => <ButtonWrapper {...props} type='button' />

export default Button

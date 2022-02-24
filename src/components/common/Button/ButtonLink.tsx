import { FC } from 'react'
import ButtonWrapper, { ButtonProps } from './index'

interface Props extends ButtonProps {
  to: string
  toExternalSite?: boolean
}

const ButtonLink: FC<Props> = props => <ButtonWrapper {...props} type='link' />

export default ButtonLink

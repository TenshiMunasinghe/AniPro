import ButtonWrapper, { ButtonProps } from './index'

interface Props extends ButtonProps {
  to: string
  toExternalSite?: boolean
}

const ButtonLink = (props: Props) => (
  <ButtonWrapper {...props} isButton={false} />
)

export default ButtonLink

import ButtonWrapper, { ButtonProps } from './index'

interface Props extends ButtonProps {
  onClick: () => void
}

const Button = (props: Props) => <ButtonWrapper {...props} isButton={true} />

export default Button

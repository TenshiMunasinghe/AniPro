import { FC } from 'react'
import LinkWrapper, { LinkProps } from '.'

interface Props extends LinkProps {
  onClick: () => void
}

const LinkButton: FC<Props> = props => <LinkWrapper {...props} type='button' />

export default LinkButton

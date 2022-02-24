import { FC } from 'react'
import LinkWrapper, { LinkProps } from '.'

interface Props extends LinkProps {
  to: string
  toExternalSite?: boolean
}

const Link: FC<Props> = props => <LinkWrapper {...props} type='link' />

export default Link

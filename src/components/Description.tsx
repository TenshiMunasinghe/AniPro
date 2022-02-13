import htmr from 'htmr'

interface Props {
  description?: string | null
}

const Description = ({ description }: Props) => {
  return description ? <>{htmr(description)}</> : <i>no description</i>
}

export default Description

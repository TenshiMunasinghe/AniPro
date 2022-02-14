import { CSSProperties, FC } from 'react'

interface Props {
  colors?: CSSProperties
}

const Container: FC<Props> = ({ children, colors }) => {
  return (
    <article
      style={colors}
      className='grid grid-cols-[clamp(6rem,40%,11rem)_1fr] overflow-hidden rounded bg-zinc-100 dark:bg-zinc-700'>
      {children}
    </article>
  )
}

export default Container

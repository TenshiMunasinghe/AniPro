import { FC } from 'react'

const Container: FC = ({ children }) => {
  return (
    <article className='grid cursor-pointer grid-rows-[min-content_auto] gap-y-2'>
      {children}
    </article>
  )
}

export default Container

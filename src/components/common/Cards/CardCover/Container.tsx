import { FC } from 'react'

const Container: FC = ({ children }) => {
  return (
    <article className='grid grid-rows-[min-content_auto] gap-y-2 cursor-pointer'>
      {children}
    </article>
  )
}

export default Container

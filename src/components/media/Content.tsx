import { FC, ReactNode } from 'react'

interface Props {
  heading: ReactNode
}

const Content: FC<Props> = ({ heading, children }) => {
  return (
    <section className='flex flex-col space-y-3'>
      <h6 className='font-medium'>{heading}</h6>
      {children}
    </section>
  )
}

export default Content

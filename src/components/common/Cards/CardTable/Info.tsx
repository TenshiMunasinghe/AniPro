interface Props {
  main: () => string | JSX.Element | null
  sub: () => string | JSX.Element | null
}

const Info = ({ main, sub }: Props) => {
  return (
    <section className='flex items-center space-x-3 md:flex-col md:items-start md:justify-center md:space-x-0'>
      <div className='text-sm md:text-base'>{main()}</div>
      <div className='text-xs font-light md:text-sm'>{sub()}</div>
    </section>
  )
}

export default Info

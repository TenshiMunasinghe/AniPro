interface Props {
  main: () => string | JSX.Element | null
  sub: () => string | JSX.Element | null
}

const Info = ({ main, sub }: Props) => {
  return (
    <section className='flex items-center space-x-3 md:space-x-0 md:flex-col md:items-start md:justify-center'>
      <div className='text-sm md:text-base'>{main()}</div>
      <div className='text-xs md:text-sm font-light'>{sub()}</div>
    </section>
  )
}

export default Info

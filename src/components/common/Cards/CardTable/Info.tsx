interface Props {
  main: () => string | JSX.Element | null
  sub: () => string | JSX.Element | null
}

const Info = ({ main, sub }: Props) => {
  return (
    <section className='flex content-center items-start space-x-3 md:flex-col md:items-start md:justify-center md:space-y-3 md:space-x-0'>
      {main() ? (
        <div className='text-sm !leading-none md:text-base'>{main()}</div>
      ) : null}
      {sub() ? (
        <div className='text-xs font-light !leading-none md:text-sm'>
          {sub()}
        </div>
      ) : null}
    </section>
  )
}

export default Info

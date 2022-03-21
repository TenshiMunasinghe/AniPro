interface Props {
  label: string
  value: string
}

const Item = ({ label, value }: Props) => {
  return (
    <div className='lg:text-lg xl:text-xl'>
      <span className='font-semibold text-zinc-900 dark:text-white '>
        {label}:{' '}
      </span>
      {value}
    </div>
  )
}

export default Item

interface Props {
  label: string
  value: string
}

const Item = ({ label, value }: Props) => {
  return (
    <div>
      <span className='font-semibold text-zinc-900 dark:text-white lg:text-lg xl:text-xl'>
        {label}:{' '}
      </span>
      {value}
    </div>
  )
}

export default Item

interface Props {
  text?: string
}

const NotFound = ({ text = 'Not Found ><' }: Props) => {
  return (
    <div className='grid h-fit place-items-center py-6 text-lg'>{text}</div>
  )
}

export default NotFound

interface Props {
  year: number | string
}

const Year = ({ year }: Props) => {
  return <h6 className='text-lg'>{year}</h6>
}

export default Year

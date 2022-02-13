import { FaFrown, FaMeh, FaSmile, FaSmileBeam } from 'react-icons/fa'

interface Props {
  meanScore: number | null
}

const FaceIcon = ({ meanScore }: Props) => {
  if (meanScore === null) return <></>

  if (meanScore < 50) {
    return <FaFrown className='fill-red-300' aria-label='frown' />
  }

  if (meanScore < 70) {
    return <FaMeh className='fill-orange-300' aria-label='meh' />
  }

  if (meanScore < 80) {
    return <FaSmile className='fill-lime-300' aria-label='smile' />
  }

  return <FaSmileBeam className='fill-yellow-300' aria-label='smile beam' />
}

export default FaceIcon

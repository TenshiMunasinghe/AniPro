import FaceIcon from './FaceIcon'

interface Props {
  score: number
}

const Score = ({ score }: Props) => {
  return (
    <div className='grid w-min grid-cols-[auto_auto] place-items-center gap-x-1'>
      <FaceIcon meanScore={score} />
      <span>{score}%</span>
    </div>
  )
}

export default Score

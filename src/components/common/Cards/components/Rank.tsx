interface Props {
  rank: number
}

const Rank = ({ rank }: Props) => {
  return (
    <div className='aspect-square rounded-full bg-[color:var(--color-adjusted)] font-medium z-30'>
      <span className='flex justify-center items-center text-center h-full text-zinc-300 dark:text-zinc-700'>
        <span className='mr-[0.1ch]'>#</span>
        <span>{rank}</span>
      </span>
    </div>
  )
}

export default Rank

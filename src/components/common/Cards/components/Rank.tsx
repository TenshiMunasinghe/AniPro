interface Props {
  rank: number
}

const Rank = ({ rank }: Props) => {
  return (
    <div className='z-30 aspect-square rounded-full bg-[color:var(--color-adjusted)] font-medium'>
      <span className='flex h-full items-center justify-center text-center text-zinc-300 dark:text-zinc-700'>
        <span className='mr-[0.1ch]'>#</span>
        <span>{rank}</span>
      </span>
    </div>
  )
}

export default Rank

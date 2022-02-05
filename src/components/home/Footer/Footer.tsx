import Anchor from '../../common/Anchor'
import ThemeButton from '../../common/ThemeButton'

const Footer = () => {
  return (
    <footer className='!mt-24 w-full md:!mt-32'>
      <div className='flex items-end'>
        <section className='mr-auto flex space-x-6'>
          <ThemeButton theme='light' />
          <ThemeButton theme='dark' />
        </section>
        <Anchor
          text='GitHub'
          href='https://github.com/TenshiMunasinghe/AniPro'
        />
      </div>

      <section className='mt-6 text-right'>
        This site is a clone of{' '}
        <Anchor text='AniList.co' href='https://anilist.co/' />
      </section>
    </footer>
  )
}

export default Footer

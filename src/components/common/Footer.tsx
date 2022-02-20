import Anchor from './Anchor'
import ThemeButton from './ThemeButton'

const Footer = () => {
  return (
    <footer className='!mt-24 w-full md:!mt-32'>
      <div className='flex items-end'>
        <section className='mr-auto flex space-x-6'>
          <ThemeButton theme='light' />
          <ThemeButton theme='dark' />
        </section>
        <Anchor
          to='https://github.com/TenshiMunasinghe/AniPro'
          variant='secondary'
          toExternalSite>
          GitHub
        </Anchor>
      </div>

      <section className='mt-6 text-right'>
        This site is a clone of{' '}
        <Anchor to='https://anilist.co/' variant='secondary' toExternalSite>
          AniList.co
        </Anchor>
      </section>
    </footer>
  )
}

export default Footer

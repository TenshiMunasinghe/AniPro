import classnames from 'classnames'
import { CSSProperties } from 'react'
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa'
import { NO_IMAGE_URL } from '../../api/queries'
import { MediaCoverImage, MediaFormat } from '../../generated/index'
import { TabsType } from '../../pages/Media'
import ButtonLink from '../common/Button/ButtonLink'
import Description from '../Description'
import TabNav from './TabNav'

interface Props {
  id: string
  bannerImg?: string | null
  coverImg?: MediaCoverImage | null
  title?: string | null
  format?: MediaFormat | null
  description?: string | null
  streamUrl?: string | null
  siteUrl?: string | null
  tabs: Partial<TabsType>[]
}

const Header = ({
  id,
  bannerImg = NO_IMAGE_URL,
  coverImg,
  title,
  format,
  description,
  streamUrl,
  siteUrl,
  tabs,
}: Props) => {
  const style = {
    '--banner-image': `url(${bannerImg})`,
    '--bg-color': coverImg?.color,
  } as CSSProperties

  return (
    <header
      className={classnames(
        'relative bg-zinc-50 [--btn-size:2.75rem] dark:bg-zinc-700 lg:flex lg:flex-col lg:items-center',
        {
          'pt-6': !bannerImg,
        }
      )}
      style={style}>
      <div
        className={classnames(
          'relative z-10 h-[calc(2*var(--media-page-image-width))] w-screen overflow-hidden bg-[image:var(--banner-image)] bg-cover bg-scroll bg-center bg-no-repeat after:absolute after:inset-0 after:block after:bg-gradient-to-b after:from-transparent after:to-zinc-900/60 after:content-[""] lg:h-[40vh] lg:bg-auto lg:bg-fixed lg:bg-top',
          { hidden: !bannerImg }
        )}
      />
      <div className='page-padding relative z-50 py-4 xl:pt-8'>
        <div className='mb-6 grid-rows-[1fr_auto] gap-x-14 lg:grid lg:w-full lg:grid-cols-[auto_1fr] xl:mb-12'>
          <div
            className={classnames(
              'mt-[calc(var(--btn-size)-(var(--media-page-image-width)/(var(--image-aspect-ratio))))] grid grid-cols-[var(--media-page-image-width)_auto] items-end gap-x-4 lg:w-fit lg:grid-cols-[var(--media-page-image-width)] lg:content-end lg:gap-y-4',
              { 'mt-0': !bannerImg }
            )}>
            <img
              className='aspect-[var(--image-aspect-ratio)] w-full rounded-sm'
              src={coverImg?.extraLarge || NO_IMAGE_URL}
              alt={title + ' cover'}
            />
            <ButtonLink
              to={
                streamUrl ||
                siteUrl ||
                `https://anilist.co/${format?.toLowerCase()}/${id}`
              }
              toExternalSite
              variant='secondary'
              className='h-[var(--btn-size)] max-w-[17rem] p-3'>
              <span>
                {streamUrl
                  ? 'Watch'
                  : siteUrl
                  ? 'Official Site'
                  : 'AniList Site'}
              </span>
              {streamUrl ? <FaPlay /> : <FaExternalLinkAlt />}
            </ButtonLink>
          </div>
          <div className='flex flex-col'>
            <h1 className='my-5 text-3xl font-bold lg:my-0'>{title}</h1>
            <h5 className='lg:hidden'>Description</h5>
            <div className='leading mt-4 h-[calc(var(--line-height)*var(--lines)*1em+(2*1.25rem))] overflow-y-auto bg-zinc-200 p-5 [--lines:9] [--line-height:1.5] dark:bg-zinc-600 lg:[--lines:6]'>
              <p
                className='leading-[var(--line-height)] line-clamp-9 hocus:line-clamp-none lg:line-clamp-6'
                tabIndex={0}>
                <Description description={description} />
              </p>
            </div>
          </div>
        </div>
        <TabNav tabs={tabs} />
      </div>
    </header>
  )
}

export default Header

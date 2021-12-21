import classnames from 'classnames'
import { FaGlobeEurope, FaSort } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import { languageOptions } from '../../../api/queries'
import { linkToMediaPage, linkToStaffPage } from '../../../App'
import { sortByOptions } from '../../../filterOptions/filterOptions'
import { MediaType, useCharacterMediaQuery } from '../../../generated/index'
import { useSortMedia } from '../../../hooks/useSortMedia'
import { useVALanguage } from '../../../hooks/useVALanguage'
import gridStyles from '../../common/CardGrid/CardGrid.module.scss'
import Card from '../../common/Cards/CardCover/Content/Content'
import Dropdown from '../../common/Dropdown/Dropdown'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import styles from './Medias.module.scss'

const Medias = () => {
  const { id } = useParams<{ id: string }>()

  const { sortBy, sortByOnChange } = useSortMedia()
  const { language, languageOnChange } = useVALanguage()

  const { data, isLoading } = useCharacterMediaQuery(gqlRequestClient, {
    sort: sortBy,
    id: parseInt(id),
    language,
  })

  const edges = data?.Character?.media?.edges

  return (
    <div className={styles.container}>
      <div className={styles.dropdowns}>
        <Dropdown
          selected={language}
          onChange={languageOnChange}
          options={languageOptions}
          icon={{ type: FaGlobeEurope, isLeft: true }}
        />
        <Dropdown
          selected={sortBy}
          onChange={sortByOnChange}
          options={sortByOptions}
          icon={{ type: FaSort, isLeft: true }}
        />
      </div>
      <div className={classnames(styles.cardContainer)}>
        {isLoading && <LoadingSpinner />}

        {!isLoading && edges?.length && (
          <div className={classnames(gridStyles.slider, gridStyles.cover)}>
            {edges?.map(edge =>
              edge?.voiceActors?.map(voiceActor => {
                const media = edge.node
                return voiceActor ? (
                  <Card
                    key={edge.id?.toString() + voiceActor.id.toString()}
                    main={{
                      link: linkToMediaPage(
                        media?.id,
                        media?.type || MediaType.Anime
                      ),
                      image: media?.coverImage?.large,
                      title: media?.title?.romaji,
                    }}
                    sub={{
                      link: linkToStaffPage(voiceActor.id),
                      image: voiceActor.image?.large,
                      title: voiceActor.name?.full,
                    }}
                  />
                ) : null
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Medias

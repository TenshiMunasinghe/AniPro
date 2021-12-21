import classnames from 'classnames'
import { FaGlobeEurope, FaSort } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import { languageOptions } from '../../../api/queries'
import { linkToStaffPage } from '../../../App'
import { sortByOptions } from '../../../filterOptions/filterOptions'
import { useCharacterMediaQuery } from '../../../generated/index'
import { useSortMedia } from '../../../hooks/useSortMedia'
import { useVALanguage } from '../../../hooks/useVALanguage'
import gridStyles from '../../common/CardGrid/CardGrid.module.scss'
import CardCover from '../../common/Cards/CardCover/CardCover'
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
            {edges?.map((edge, x) =>
              edge?.voiceActors?.map((voiceActor, y) =>
                voiceActor ? (
                  <CardCover
                    media={edge?.node}
                    index={parseInt(x.toString() + y.toString())}
                    key={edge.id}
                    imageSize='large'
                    hasPopover={false}
                    subContent={{
                      link: linkToStaffPage(voiceActor.id),
                      image: voiceActor.image?.large,
                      title: voiceActor.name?.full,
                    }}
                  />
                ) : null
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Medias

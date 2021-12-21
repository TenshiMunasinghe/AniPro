import classnames from 'classnames'
import { useCallback, useState } from 'react'
import { FaGlobeEurope, FaSort } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import { languageOptions } from '../../../api/queries'
import { linkToStaffPage } from '../../../App'
import { sortByOptions } from '../../../filterOptions/filterOptions'
import {
  MediaSort,
  StaffLanguage,
  useCharacterMediaQuery,
} from '../../../generated/index'
import gridStyles from '../../common/CardGrid/CardGrid.module.scss'
import CardCover from '../../common/Cards/CardCover/CardCover'
import Dropdown from '../../common/Dropdown/Dropdown'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import styles from './Medias.module.scss'

const Medias = () => {
  const { id } = useParams<{ id: string }>()
  const [sortBy, setSortBy] = useState<MediaSort | MediaSort[]>(
    MediaSort.PopularityDesc
  )

  const [language, setLanguage] = useState<StaffLanguage>(
    StaffLanguage.Japanese
  )

  const { data, isLoading } = useCharacterMediaQuery(gqlRequestClient, {
    sort: sortBy,
    id: parseInt(id),
    language,
  })

  const sortByOnChange = useCallback((value: string | string[]) => {
    setSortBy(value as MediaSort | MediaSort[])
  }, [])

  const languageOnChange = useCallback((value: string | string[]) => {
    setLanguage(value as StaffLanguage)
  }, [])

  const medias = data?.Character?.media?.edges

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

        {!isLoading && medias?.length && (
          <div className={classnames(gridStyles.slider, gridStyles.cover)}>
            {medias?.map((m, x) =>
              m?.voiceActors?.map((voiceActor, y) =>
                voiceActor ? (
                  <CardCover
                    media={m?.node}
                    index={parseInt(x.toString() + y.toString())}
                    key={m.node?.id.toString() + voiceActor.id.toString()}
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

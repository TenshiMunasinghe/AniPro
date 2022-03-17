import toUpper from 'lodash/toUpper'
import uniq from 'lodash/uniq'
import { useMemo } from 'react'
import { FaGlobeEurope, FaSort } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import { linkToMediaPage, linkToStaffPage } from '../../../App'
import { MediaType, useCharacterMediaQuery } from '../../../generated/index'
import { useSortMedia } from '../../../hooks/useSortMedia'
import { useVALanguage } from '../../../hooks/useVALanguage'
import Grid from '../../common/CardGridContainer'
import Card from '../../common/Cards/CardCover/Content'
import CardContainer from '../../person/CardContainer'
import Dropdowns from '../../person/Dropdowns'
import { sortByOptions } from '../../staff/Medias'

const Medias = () => {
  const { id } = useParams<{ id: string }>()

  const { sortBy, sortByOnChange } = useSortMedia()
  const { language, languageOnChange } = useVALanguage()

  const { data, isLoading } = useCharacterMediaQuery(gqlRequestClient, {
    sort: sortBy,
    id: parseInt(id),
  })

  const languageOptions = useMemo(() => {
    const languages = uniq(
      data?.Character?.media?.edges?.flatMap(media =>
        media?.voiceActors?.flatMap(va => va?.languageV2)
      )
    )

    return languages.map(value => ({
      label: value || '',
      value: toUpper(value || ''),
    }))
  }, [data])

  const edges = data?.Character?.media?.edges?.map(media => ({
    ...media,
    voiceActors: media?.voiceActors?.filter(
      va => toUpper(va?.languageV2 || '') === language
    ),
  }))

  return (
    <>
      <Dropdowns
        dropdowns={[
          {
            selected: language,
            onChange: languageOnChange,
            options: languageOptions,
            icon: { type: FaGlobeEurope, isLeft: true },
          },
          {
            selected: sortBy,
            onChange: sortByOnChange,
            options: sortByOptions,
            icon: { type: FaSort, isLeft: true },
          },
        ]}
      />
      <CardContainer isLoading={isLoading}>
        {edges?.length && (
          <Grid cardType='cover'>
            {edges?.map(edge => {
              const media = edge.node
              const voiceActors = edge?.voiceActors

              //display media without voice actor/actress if there are't any
              if (voiceActors?.length === 0) {
                return (
                  <Card
                    key={edge.id?.toString()}
                    main={{
                      link: linkToMediaPage(
                        media?.id,
                        media?.type || MediaType.Anime
                      ),
                      image: media?.coverImage?.large,
                      title: media?.title?.romaji,
                    }}
                  />
                )
              }

              return edge?.voiceActors?.map(voiceActor => {
                if (!voiceActor) return null
                return (
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
                    sub={
                      voiceActor
                        ? {
                            link: linkToStaffPage(voiceActor.id),
                            image: voiceActor.image?.large,
                            title: voiceActor.name?.full,
                          }
                        : undefined
                    }
                  />
                )
              })
            })}
          </Grid>
        )}
      </CardContainer>
    </>
  )
}

export default Medias

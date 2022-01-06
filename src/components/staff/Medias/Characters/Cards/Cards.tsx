import classnames from 'classnames'
import React from 'react'
import { DeepPartial } from 'react-hook-form'
import { linkToCharacterPage, linkToMediaPage } from '../../../../../App'
import { MediaEdge, MediaType } from '../../../../../generated'
import styles from '../../../../common/CardGrid/CardGrid.module.scss'
import Card from '../../../../common/Cards/CardCover/Content/Content'

interface Props {
  edges: (DeepPartial<MediaEdge> | null | undefined)[] | null | undefined
}

const Cards = ({ edges }: Props) => (
  <div className={classnames(styles.slider, styles.cover)}>
    {edges?.map(edge =>
      edge?.characters?.map(character => {
        const media = edge.node
        return character ? (
          <Card
            key={String(edge.id) + String(character.id)}
            main={{
              link: linkToCharacterPage(character?.id),
              image: character?.image?.large,
              title: character?.name?.full,
            }}
            sub={{
              link: linkToMediaPage(media?.id, media?.type || MediaType.Anime),
              image: media?.coverImage?.large,
              title: media?.title?.romaji,
            }}
          />
        ) : null
      })
    )}
  </div>
)

export default Cards

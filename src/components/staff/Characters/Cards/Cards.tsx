import { DeepPartial } from 'react-hook-form'
import { linkToCharacterPage, linkToMediaPage } from '../../../../App'
import { MediaEdge, MediaType } from '../../../../generated'
import Grid from '../../../common/CardGridContainer'
import Card from '../../../common/Cards/CardCover/Content'

interface Props {
  edges: (DeepPartial<MediaEdge> | null | undefined)[] | null | undefined
}

const Cards = ({ edges }: Props) => (
  <Grid cardType='cover'>
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
  </Grid>
)

export default Cards

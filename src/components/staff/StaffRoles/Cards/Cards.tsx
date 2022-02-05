import { DeepPartial } from 'react-hook-form'
import { linkToMediaPage } from '../../../../App'
import { MediaEdge, MediaType } from '../../../../generated'
import Grid from '../../../common/CardGridContainer'
import Card from '../../../common/Cards/CardCover/Content'

interface Props {
  edges: (DeepPartial<MediaEdge> | null | undefined)[] | null | undefined
}

const Cards = ({ edges }: Props) => (
  <Grid cardType='cover'>
    {edges?.map(edge => {
      const media = edge?.node
      return edge ? (
        <Card
          key={String(edge.id) + edge.staffRole}
          main={{
            link: linkToMediaPage(media?.id, media?.type || MediaType.Anime),
            image: media?.coverImage?.large,
            title: media?.title?.romaji,
          }}
          sub={{
            title: edge.staffRole,
          }}
        />
      ) : null
    })}
  </Grid>
)

export default Cards

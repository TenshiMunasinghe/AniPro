import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchAnimeDetails } from '../../../hooks/useFetchAnimeDetail'
import { ParamTypes } from '../../../pages/media/Media'
import Title from '../../common/Cards/components/Title/Title'
import CoverImage from '../../common/CoverImage/CoverImage'
import Character from '../Character/Character'
import Content from '../Content/Content'
import Person from '../Person/Person'
import Relation from '../Relation/Relation'
import Scores from '../Score/Scores'
import Status from '../Status/Status'
import styles from './Overview.module.scss'

const Overview = () => {
  const { id } = useParams<ParamTypes>()
  const { data } = useFetchAnimeDetails(id, 'overview')

  if (!data) return null

  return (
    <div className={styles.container}>
      <Content heading='Relations'>
        <div className={styles.relations}>
          {data.relations.edges.map(({ node, relationType }) => (
            <Relation
              key={node.id}
              id={node.id}
              image={node.coverImage.large}
              title={node.title.romaji}
              format={node.format}
              status={node.status}
              relation={relationType}
            />
          ))}
        </div>
      </Content>
      <Content heading='Characters'>
        <div className={styles.characters}>
          {data.characters.edges.map(character => (
            <Character character={character} key={character.node.id} />
          ))}
        </div>
      </Content>
      <Content heading='Staff'>
        <div className={styles.staff}>
          {data.staff.edges.map(staff => (
            <Person
              name={staff.node.name.full}
              image={staff.node.image.large}
              info={staff.role}
              key={staff.node.id}
            />
          ))}
        </div>
      </Content>
      <Content heading='Status Distribution'>
        <Status
          viewingStatus={data.stats.statusDistribution}
          airingStatus={data.status}
        />
      </Content>
      <Content heading='Score Distribution'>
        <Scores scores={data.stats.scoreDistribution} />
      </Content>
      <Content heading='Trailer'>
        <div className={styles.trailer}>
          <iframe
            title='Trailer'
            src={`https://www.${data.trailer?.site}.com/embed/${data.trailer?.id}`}
          />
        </div>
      </Content>
      <Content heading='Recomendations'>
        <div className={styles.recommendations}>
          {data.recommendations.nodes.map(({ mediaRecommendation: m }, i) => (
            <div className={styles.cardCover} key={'recommendations' + m.id}>
              <CoverImage
                id={m.id}
                src={m.coverImage.large}
                title={m.title.romaji}
              />
              <Title id={m.id} text={m.title.romaji} />
            </div>
          ))}
        </div>
      </Content>
    </div>
  )
}

export default Overview

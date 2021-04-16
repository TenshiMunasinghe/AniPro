import React from 'react'

import { QueryVar } from '../../../api/types'
import { allowedURLParams } from '../../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { CardType } from '../../../pages/search/Search'
import CardGrid from '../../common/CardGrid/CardGrid'
import styles from './Content.module.scss'

export type _Content = {
  text: string
  cardType: CardType
  hasRank?: boolean
}

interface Props {
  queryVar: QueryVar
  content: _Content
}

const Content = ({ queryVar, content }: Props) => {
  const { addFilterOptions } = useUpdateUrlParam()

  const filterQuery = Object.fromEntries(
    Object.entries(queryVar).filter(([k]) =>
      //filter out the query variable which is not a filter option(eg:perPage)
      allowedURLParams.includes(k)
    )
  )

  const setFilterQuery = () => {
    addFilterOptions(filterQuery as Partial<QueryVar>, true)
  }

  return (
    <section className={styles.content}>
      <button className={styles.button} onClick={setFilterQuery}>
        <h3 className={styles.contentTitle}>{content.text}</h3>
        <span className={styles.viewAll}>View All</span>
      </button>
      <CardGrid
        params={new URLSearchParams(Object.entries(queryVar))}
        cardType={content.cardType}
        imageSize={content.cardType === 'table' ? 'large' : 'extraLarge'}
        loadingCount={queryVar.perPage}
        hasRank={content.hasRank}
        hasPages={false}
        sideScroll={content.cardType === 'cover'}
      />
    </section>
  )
}

export default Content

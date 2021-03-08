import React from 'react';

import { QueryVar } from '../../../api/types';
import { filterOptions } from '../../../filterOptions/filterOptions';
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam';
import { CardType } from '../../../pages/search/Search';
import CardGrid from '../../common/CardGrid/CardGrid';
import styles from './Content.module.scss';

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
  const updateUrLParam = useUpdateUrlParam()

  const filterQuery = Object.fromEntries(
    Object.entries(queryVar).filter(([k, _]) =>
      //filter out the query variable which is not a filter option(eg:perPage)
      Object.keys(filterOptions).includes(k)
    )
  )
  const setFilterQuery = () =>
    updateUrLParam(new URLSearchParams(), filterQuery as Partial<QueryVar>)

  return (
    <section className={styles.content}>
      <button className={styles.button} onClick={setFilterQuery}>
        <h3 className={styles.contentTitle}>{content.text}</h3>
        <span className={styles.viewAll}>View All</span>
      </button>
      <CardGrid
        queryVariables={queryVar}
        cardType={content.cardType}
        loadingCount={queryVar.perPage}
        hasRank={content.hasRank}
        allowLoadMore={false}
        sideScroll={content.cardType === 'cover'}
      />
    </section>
  )
}

export default Content

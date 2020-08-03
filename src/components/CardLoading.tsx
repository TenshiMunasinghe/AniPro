import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styled from 'styled-components'

interface Props {}

const CardLoading = (props: Props) => {
  return (
    <SkeletonTheme color='#515151' highlightColor='#818181'>
      <Wrapper>
        <Image />
        <CardBody>
          <Title />
          <Genres>
            <Genre />
            <Genre />
            <Genre />
            <Genre />
            <Genre />
          </Genres>
          <Description count={5} />
        </CardBody>
      </Wrapper>
    </SkeletonTheme>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #313131;
`

const Image = styled(Skeleton)`
  && {
    height: 17rem;
    margin: auto 1rem;
    border-radius: 0.8rem;
    width: 12.5rem;
  }
`

const Title = styled(Skeleton)`
  && {
    font-size: 1rem;
    margin-bottom: 0.2rem;
    width: 70%;
  }
`

const CardBody = styled.div`
  width: 100%;
  * {
    word-wrap: break-word;
    white-space: normal;
    line-height: 150%;
  }
`

const Genres = styled.div`
  margin: 1rem 0;
`

const Genre = styled(Skeleton)`
  && {
    border-radius: 0.5rem;
    font-size: 0.8rem;
    padding: 0.5rem;
    margin-right: 0.5rem;
    display: inline-block;
    border-radius: 0.5rem;
    width: 3.5rem;
  }
`

const Description = styled(Skeleton)`
  margin-bottom: 1rem;
`

export default CardLoading

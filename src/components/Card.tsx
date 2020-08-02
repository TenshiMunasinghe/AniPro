import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import htmlParser from 'react-html-parser'

interface Props {
  id: number
  image: string
  title: {
    native: string
    romaji: string
  }
  genres: string[]
  status: string
  nextAiring: {
    timeUntilAiring: number
    episode: number
  }
  description: string
}

const Card = ({
  image,
  title,
  genres,
  status,
  nextAiring,
  id,
  description,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const hoverHandler = useRef<number>()
  const descriptionWithEllipse =
    description && description.length > 300
      ? description.substring(0, 297) + '...'
      : description

  const onMouseEnter = () => {
    hoverHandler.current = window.setTimeout(() => setIsHovered(true), 300)
  }

  const onMouseLeave = () => {
    window.clearTimeout(hoverHandler.current)
    setIsHovered(false)
  }

  return (
    <Wrapper>
      <Image src={image} alt={title.romaji} />

      <CardBody>
        <div>
          <Title>
            {title.romaji}
            <Status>- {_.startCase(_.lowerCase(status))}</Status>
          </Title>
          <SecondaryTitle>{title.native}</SecondaryTitle>
        </div>

        <Genres>
          {genres.map((c: string) => (
            <Genre key={c}>{c}</Genre>
          ))}
        </Genres>

        <Description
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          isHovered={isHovered}>
          {isHovered
            ? htmlParser(description)
            : htmlParser(descriptionWithEllipse)}
        </Description>
      </CardBody>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  background: #313131;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  padding: 1rem;
`

const Image = styled.img`
  height: 17rem;
  margin: auto 1rem;
  border-radius: 0.8rem;
`

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.2rem;
  color: #e1e1e1;
`

const SecondaryTitle = styled.h4`
  font-size: 0.6rem;
  color: #d1d1d1;
`

const CardBody = styled.div`
  width: 100%;
  * {
    word-wrap: break-word;
    white-space: normal;
    line-height: 150%;
  }
`

const Status = styled.span`
  margin-left: 1rem;
  font-size: 0.8rem;
  color: #a1a1a1;
`

const Genres = styled.div`
  margin: 1rem 0;
`

const Genre = styled.a`
  border-radius: 0.5rem;
  font-size: 0.8rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
  display: inline-block;
  background: #222222;
  border-radius: 0.5rem;
  border: solid 2px #727272;
  cursor: pointer;

  &:hover {
    color: #99ccff;
  }

  &:active {
    background: #111111;
    border-color: #828282;
  }
`

const Description = styled.p<{ isHovered: boolean }>`
  height: 10rem;
  overflow-y: ${({ isHovered }) => (isHovered ? 'scroll' : 'hidden')};
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.68);
  * {
    color: rgba(255, 255, 255, 0.68);
  }

  &:hover {
    color: inherit;
    * {
      color: inherit;
    }
  }
`

export default Card

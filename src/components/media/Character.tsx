import { memo } from 'react'
import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../api/queries'
import { CharacterEdge } from '../../generated/index'
import Person from './Person'

interface Props {
  character?: DeepPartial<CharacterEdge> | null
}

const Character = ({ character }: Props) => {
  const characterNode = character?.node
  const voiceActor = character?.voiceActors?.[0]
  return (
    <div className='grid grid-cols-2'>
      <Person
        id={characterNode?.id}
        image={characterNode?.image?.large || NO_IMAGE_URL}
        name={characterNode?.name?.full || 'no name'}
        info={character?.role}
        type='Character'
      />
      {character?.voiceActors?.length ? (
        <Person
          id={voiceActor?.id}
          image={voiceActor?.image?.large || NO_IMAGE_URL}
          name={voiceActor?.name?.full || 'no name'}
          info='Japanese'
          type='Staff'
          isReversed
        />
      ) : null}
    </div>
  )
}

export default memo(Character)

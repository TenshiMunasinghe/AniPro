import { useHistory } from 'react-router-dom'

export const useSetGenre = () => {
  const history = useHistory()
  return (genre: string) => history.push(`/search/?genres=${genre}`)
}

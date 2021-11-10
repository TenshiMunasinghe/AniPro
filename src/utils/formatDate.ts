const dateFormat = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

export const formatDate = ({
  year,
  month,
  day,
}: {
  year?: number | null
  month?: number | null
  day?: number | null
}) => {
  const string = new Date(year || 0, (month || 0) - 1, day || 0)
    .toLocaleDateString('en-US', dateFormat)
    .replaceAll(',', '')

  const arr = string.split(' ')

  if (!day) {
    arr.splice(0, 1)
  }
  if (!month) {
    arr.splice(1, 1)
  }
  if (!year) {
    arr.splice(2, 1)
  }

  return arr.join(' ')
}

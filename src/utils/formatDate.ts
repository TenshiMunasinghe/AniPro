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
  const string = new Date(year || 0, month || 0, day || 0)
    .toLocaleDateString('en-US', dateFormat)
    .replaceAll(',', '')

  const arr = string.split(' ')

  if (!month) {
    arr[0] = ''
  }
  if (!day) {
    arr[1] = ''
  }
  if (!year) {
    arr[2] = ''
  }

  return arr.filter(item => item).join(' ')
}

export const formatDate = ({
  year,
  month,
  day,
}: {
  year?: number | null
  month?: number | null
  day?: number | null
}) => {
  const string = new Date(year || 0, month ? month - 1 : 0, day || 0)
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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

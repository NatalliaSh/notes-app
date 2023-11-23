export const checkEmptyFields = (value: string) => {
  if (value) {
    return ''
  }
  return 'Please field out this field'
}

const PASSWORD_REG_EXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

export const checkEmptyFields = (value: string) => {
  if (value) {
    return ''
  }
  return 'Please field out this field'
}

export const checkPassword = (value: string) => {
  const emptyMessage = checkEmptyFields(value)

  if (emptyMessage) {
    return emptyMessage
  }

  if (PASSWORD_REG_EXP.test(value)) {
    return ''
  } else {
    return 'Invalid password'
  }
}

export const checkNoteTitle = (value: string) => {
  const emptyMessage = checkEmptyFields(value)

  if (emptyMessage) {
    return emptyMessage
  }

  if (value.length <= 25) {
    return ''
  } else {
    return 'The maximum lenght of title is 25 symbols'
  }
}

export const checkNoteText = (value: string) => {
  const emptyMessage = checkEmptyFields(value)

  if (emptyMessage) {
    return emptyMessage
  }

  if (value.length <= 250) {
    return ''
  } else {
    return 'The maximum lenght of note text is 250 symbols'
  }
}

import {checkPassword} from '../utils/validation'
import {describe} from '@jest/globals'

describe('Test check password validation util', () => {
  test('Test empty field', () => {
    expect(checkPassword('')).toEqual('Please field out this field')
  })

  test('Test invalid password', () => {
    expect(checkPassword('fdfddF5ff')).toEqual('Invalid password')
  })

  test('Test valid password', () => {
    expect(checkPassword('fdJ5ve&?fds')).toEqual('')
  })
})

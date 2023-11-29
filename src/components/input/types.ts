export type InputData = {
  name: 'userName' | 'password' | 'title' | 'text' | 'tags' | 'newPassword'
  value: string
  maxLength: number
  errorMessage: string
  isRequired: boolean
  validationFn: (value: string) => string
  type: 'text' | 'number' | 'email' | 'password'
}

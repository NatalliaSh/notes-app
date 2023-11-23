export type InputData = {
  name: string
  label: string
  value: string
  maxLength: number
  placeholder: string
  errorMessage: string
  validationFn: (value: string) => string
  type: 'text' | 'number' | 'email' | 'password'
}

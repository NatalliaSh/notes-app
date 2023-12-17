export type LoginError = {
  error: {
    data: string
    error: string
    originalStatus: number
    status: string
  }
  isUnhandledError: boolean
  meta: {
    request: Request
    response: Response
  }
}

interface appError {
  statusCode: number
  status: string
  isOperational: boolean
}

class appError extends Error {
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error'
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export default appError

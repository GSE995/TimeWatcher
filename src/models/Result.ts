class Result<T> {
  public readonly success: boolean
  public data?: T
  public message?: string

  constructor(success: boolean) {
    this.success = success
  }

  public ifSuccess(f: Function): Result<T> {
    if (this.success) f(this.data)
    return this
  }

  public ifFailure(f: Function): Result<T> {
    if (!this.success) f(this.message)
    return this
  }

  public anyResult(f: Function): Result<T> {
    f()
    return this
  }
}

class SuccessResult<T> extends Result<T> {
  constructor(data: T) {
    super(true)
    this.data = data
  }
}

class ErrorResult extends Result<Boolean> {
  constructor(message: string) {
    super(false)
    this.message = message
  }
}

export { Result, SuccessResult, ErrorResult }

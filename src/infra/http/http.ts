import StatusCode from 'status-code-enum'

export function response (data: Record<string, any>, statusCode: number): Record<string, any> {
  return {
    statusCode,
    data
  }
}

export function ok (data: Record<string, any>): Record<string, any> {
  return response(data, StatusCode.SuccessOK)
}

export function okNoContent (data: Record<string, any>): Record<string, any> {
  return response(data, StatusCode.SuccessNoContent)
}

export function badRequest (data: Record<string, any>): Record<string, any> {
  return response(data, StatusCode.ClientErrorBadRequest)
}

export function internalServerError (data: Record<string, any>): Record<string, any> {
  return response(data, StatusCode.ServerErrorInternal)
}

export function unauthorized (data: Record<string, any>): Record<string, any> {
  return response(data, StatusCode.ClientErrorUnauthorized)
}

export function notFound (data: Record<string, any>): Record<string, any> {
  return response(data, StatusCode.ClientErrorNotFound)
}

export function redirect (url: string): Record<string, any> {
  return {
    redirectTo: url
  }
}

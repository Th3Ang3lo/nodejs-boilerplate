import { RequestHandler as ExpressRequestHandler } from 'express'

export interface HttpParams<T = Record<string, any>> { params: T }
export interface HttpBody<T = Record<string, any>> { body: T }
export interface HttpHeaders<T = Record<string, any>> { headers: T }
export interface HttpQuery<T = Record<string, any>> { query: T }
export interface HttpFile<T = Express.Multer.File> { file?: T }
export interface HttpFiles<T = Express.Multer.File[]> { files?: T }

export type RequestHandler = ExpressRequestHandler

export type Request = Partial<HttpParams & HttpBody & HttpHeaders & HttpQuery & HttpFile & HttpFiles>
export type Response = Record<string, any>

export interface Controller {
  handle: (request: Request) => Promise<Response>
}

export interface IContextData {
  [context: string]: string | number
}

export interface IMailProvider {
  sendMail: (to: string, context: IContextData, subject: string, template: string, sender?: string) => Promise<void>
}

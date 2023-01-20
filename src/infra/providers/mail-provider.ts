import aws from 'aws-sdk'
import nodemailer, { Transporter } from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

import { IMailProvider, IContextData } from '@/domain/contracts/providers/mail-provider'

import { Env } from '@/shared/env'
export class MailProvider implements IMailProvider {
  private readonly transporter: Transporter

  constructor () {
    this.transporter = nodemailer.createTransport({
      SES: new aws.SES({
        region: Env.getAWSSesRegion(),
        accessKeyId: Env.getAWSAccessKeyID(),
        secretAccessKey: Env.getAWSSecretAccessKey(),
        apiVersion: '2010-12-01'
      })
    })

    this.transporter.use('compile', hbs({
      viewEngine: {
        partialsDir: path.resolve('./src/shared/resources/mail/')
      },
      viewPath: path.resolve('./src/shared/resources/mail/'),
      extName: '.html'
    })
    )
  }

  public async sendMail (to: string, context: IContextData, subject: string, template: string, sender = 'Sender'): Promise<void> {
    await this.transporter.sendMail({
      to,
      from: Env.getEmailFrom(),
      sender,
      subject,
      template,
      context
    } as any)
  }
}

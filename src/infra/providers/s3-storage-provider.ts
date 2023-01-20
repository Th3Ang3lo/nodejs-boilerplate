import crypto from 'crypto'
import path from 'path'

import aws, { S3 } from 'aws-sdk'

import { IStorageProvider } from '@/domain/contracts/providers'

import { Env } from '@/shared/env'

export class S3StorageProvider implements IStorageProvider {
  private readonly s3: S3

  constructor () {
    this.s3 = new aws.S3({
      region: Env.getAWSS3Region(),
      accessKeyId: Env.getAWSAccessKeyID(),
      secretAccessKey: Env.getAWSSecretAccessKey()
    })
  }

  public async saveFile (file: Express.Multer.File, insidePath = '', acl = 'public-read'): Promise<string> {
    const fileHash = `${crypto.randomBytes(32).toString('hex')}${path.extname(file.originalname)}`
    let fileToSave = `${insidePath}${insidePath && '/'}${fileHash}`

    try {
      await this.s3.putObject({
        Bucket: Env.getAWSS3Bucket(),
        Key: fileToSave,
        ACL: acl,
        Body: file.buffer,
        ContentType: file.mimetype
      }).promise()
    } catch (error) {
      fileToSave = 'users/default.png'
    }

    return `${Env.getStorageUrl()}/${fileToSave}`
  }
}

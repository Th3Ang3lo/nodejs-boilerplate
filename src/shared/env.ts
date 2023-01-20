export class Env {
  public static isProduction () {
    return process.env.NODE_ENV === 'production'
  }

  public static getPort () {
    return process.env.PORT
  }

  public static getPostgresUrl () {
    return process.env.POSTGRES_URL
  }

  public static getEmailFrom () {
    return process.env.EMAIL_FROM
  }

  public static getJwtSecret () {
    return process.env.JWT_SECRET
  }

  public static getJwtSecretPasswordReset () {
    return process.env.JWT_SECRET_PASSWORD_RESET
  }

  public static getAWSSesRegion () {
    return process.env.AWS_SES_REGION
  }

  public static getAWSAccessKeyID () {
    return process.env.AWS_ACCESS_KEY_ID
  }

  public static getAWSSecretAccessKey () {
    return process.env.AWS_SECRET_ACCESS_KEY
  }

  public static getAWS3Bucket () {
    return process.env.AWS_S3_BUCKET
  }

  public static getStorageUrl () {
    return process.env.AWS_STORAGE_URL
  }

  public static getResetPasswordUrl () {
    return process.env.RESET_PASSWORD_URL
  }
}

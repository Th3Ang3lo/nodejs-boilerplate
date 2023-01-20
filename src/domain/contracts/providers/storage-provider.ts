export interface IStorageProvider {
  saveFile: (file: Express.Multer.File, insidePath?: string) => Promise<string>
}

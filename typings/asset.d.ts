import { MetaSysProps } from './meta'
import { DefaultElements } from './defaultElements'

export interface AssetProps {
  fields: {
    title: { [key: string]: string },
    description: { [key: string]: string },
    file: {
      [key: string]: {
        fileName: string,
        contentType: string,
        upload?: string,
        url?: string,
        details: Object,
      }
    }
  }
}

export interface AssetProcessingForLocale {
  processingCheckWait: number,
  processingCheckRetries: number
}

export interface Asset extends AssetProps, DefaultElements<AssetProps & { sys: { locale: string } & MetaSysProps }> {
  sys: { locale: string } & MetaSysProps,
  archive(): Promise<Asset>,
  delete(): Promise<void>,
  isArchived(): boolean,
  isDraft(): boolean,
  isPublished(): boolean,
  isUpdated(): boolean,
  isUpdated(): boolean,
  processForAllLocales(options: AssetProcessingForLocale): Promise<Asset>,
  processForLocale(locale: string, Options: AssetProcessingForLocale): Promise<Asset>,
  publish(): Promise<Asset>,
  unarchive(): Promise<Asset>,
  unpublish(): Promise<Asset>,
  update(): Promise<Asset>,
}

import { Except } from 'type-fest'
import { BasicMetaSysProps, Link, SysLink } from '../common-types'

type AppBundleSys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: SysLink
  organization: SysLink
}

type File = {
  name: string
  size: number
  md5: string
}

export type CreateAppBundleProps = {
  upload: Link<'AppUpload'>
}

export type AppBundleProps = {
  /**
   * System metadata
   */
  sys: AppBundleSys
  /**
   * List of all the files that are in a bundle
   */
  files: File[]
}

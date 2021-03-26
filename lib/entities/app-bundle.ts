import { Except } from 'type-fest'
import { BasicMetaSysProps, SysLink } from '../common-types'

type AppBundleSys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: SysLink
  organization: SysLink
}

type File = {
  name: string
  size: number
  md5: string
}

export type AppBundleProps = {
  sys: AppBundleSys
  files: File[]
}

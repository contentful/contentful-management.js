import { Except } from 'type-fest'
import { BasicMetaSysProps, SysLink } from '../common-types'

type AppUploadSys = Except<BasicMetaSysProps, 'version'>

export type AppUploadProps = {
  sys: AppUploadSys & {
    expiresAt: string
    organization: SysLink
  }
}

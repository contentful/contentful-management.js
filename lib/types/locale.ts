import { BasicMetaSysProps, MetaLinkProps } from './common-types'

export interface LocaleProps {
  sys: BasicMetaSysProps & {
    space: { sys: MetaLinkProps }
    environment: { sys: MetaLinkProps }
  }
  name: string
  code: string
  fallbackCode: string
  contentDeliveryApi: boolean
  contentManagementApi: boolean
  default: boolean
  optional: boolean
}

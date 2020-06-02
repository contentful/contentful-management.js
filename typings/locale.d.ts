import { DefaultElements } from './generated/types/common-types'
import { LocaleProps } from './generated/types/locale'

export interface Locale
  extends LocaleProps,
    DefaultElements<LocaleProps> {
  delete(): Promise<void>
  update(): Promise<Locale>
}

export interface CreateLocaleProps {
  name: string
  code: string
  fallbackCode: string
  contentDeliveryApi?: boolean
  contentManagementApi?: boolean
  default?: boolean
  optional?: boolean
}

import { MetaSys, MetaSysProps, DefaultElements } from './generated/common-types'

export interface PreviewApiKeyProps {
  name: string
  description: string
}

export interface PreviewApiKey
  extends PreviewApiKeyProps,
    MetaSys<MetaSysProps>,
    DefaultElements<PreviewApiKeyProps & MetaSys<MetaSysProps>> {}

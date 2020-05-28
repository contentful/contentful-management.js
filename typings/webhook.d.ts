import { MetaSys, MetaSysProps, DefaultElements } from './generated/types/common-types'

export interface WebhookProps {
  name: string
  url: string
  httpBasicUsername: string
  httpBasicPassword: string
  headers: {
    [key: string]: any
  }
  topics: string[]
  transformation?: {
    method?: string
    contentType?: string
    includeContentLength?: boolean
    body?: any
  }
}

export interface WebHooks
  extends WebhookProps,
    MetaSys<MetaSysProps>,
    DefaultElements<WebhookProps & MetaSys<MetaSysProps>> {
  delete(): Promise<void>
  getCalls(): Promise<Record<string, any>>
  getHealth(): Promise<Record<string, any>>
  update(): Promise<WebHooks>
}

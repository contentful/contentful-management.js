import { MetaSys, MetaSysProps, DefaultElements } from './generated/types/common-types'

export interface Upload extends MetaSys<MetaSysProps>, DefaultElements<MetaSys<MetaSysProps>> {
  delete(): Promise<void>
}

import { MetaSys, MetaSysProps, DefaultElements } from './generated/common-types'

export interface TeamProps {
  name: string
  description: string
}

export interface Team
  extends MetaSys<MetaSysProps>,
    TeamProps,
    DefaultElements<MetaSys<MetaSysProps> & TeamProps> {
  delete(): Promise<void>
  update(): Promise<Team>
}

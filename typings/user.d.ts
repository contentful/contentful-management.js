import { MetaSys, MetaSysProps, DefaultElements } from './generated/common-types'

export interface UserProps {
  firstName: string
  lastName: string
  avatarUrl: string
  email: string
  activated: boolean
  signInCount: number
  confirmed: boolean
}

export interface User
  extends UserProps,
    MetaSys<MetaSysProps>,
    DefaultElements<UserProps & MetaSys<MetaSysProps>> {}

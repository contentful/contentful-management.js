import { MetaSysProps, DefaultElements } from './generated/types/common-types'

export interface UserProps {
  sys: MetaSysProps;
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
    DefaultElements<UserProps> {}

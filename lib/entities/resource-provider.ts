import type { BasicMetaSysProps, SysLink } from '../common-types'

export type ResourceProviderProps = {
  sys: Omit<BasicMetaSysProps, 'version'> & {
    organization: SysLink
    appDefinition: SysLink
  }
  type: string
  function: SysLink
}

export type UpsertResourceProviderProps = Omit<ResourceProviderProps, 'sys'> & {
  sys: { id: string }
}

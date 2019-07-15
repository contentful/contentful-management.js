import { DefaultElements } from './defaultElements'
import { MetaSys, MetaSysProps } from './meta'

export interface OrganisationProp {
  name: string
}

export interface Organisation extends DefaultElements<OrganisationProp>, OrganisationProp, MetaSys<MetaSysProps> {}

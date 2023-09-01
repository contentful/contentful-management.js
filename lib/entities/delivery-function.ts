import { Link } from '../common-types'

export type DeliveryFunctionProps = {
  sys: {
    id: string
    type: 'DeliveryFunction'
    createdBy: Link<'User'> // Only users can CRUD
    createdAt: string
    updatedBy: Link<'User'> // Only users can CRUD
    updatedAt: string
    organization: Link<'Organization'>
    appDefinition: Link<'AppDefinition'>
  }
  name: string
  description: string
  path: string
  allowNetworks?: string[]
}

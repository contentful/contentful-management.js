import type { Organization, RoleProps, Space } from '../../lib/export-types'
import { initClient, createTestSpace, generateRandomId, getTestOrganization } from '../helpers'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

const roleDefinition: Omit<RoleProps, 'sys'> = {
  name: 'Content Editor',
  description: 'Can only edit content',
  policies: [
    {
      effect: 'allow',
      actions: 'all',
      constraint: { and: [{ equals: [{ doc: 'sys.type' }, 'Asset'] }] },
    },
    {
      effect: 'allow',
      actions: 'all',
      constraint: { and: [{ equals: [{ doc: 'sys.type' }, 'Entry'] }] },
    },
  ],
  permissions: {
    ContentModel: ['read'],
    Settings: [],
    ContentDelivery: [],
    EnvironmentAliases: [],
    Environments: [],
    Tags: [],
  },
}

describe('Role API', () => {
  let org: Organization
  let space: Space

  beforeAll(async () => {
    org = await getTestOrganization()
    space = await createTestSpace(initClient(), 'Role')
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }
  })

  it('Gets roles', async () => {
    const response = await space.getRoles()
    expect(response.sys).toBeDefined()
    expect(response.items).toBeDefined()
  })

  it('Gets roles for organization', async () => {
    const response = await org.getRoles()
    expect(response.sys).toBeDefined()
    expect(response.items).toBeDefined()
  })

  it('Create role with id', async () => {
    const id = generateRandomId('role')
    const role = await space.createRoleWithId(id, roleDefinition)
    expect(role.sys.id).toBe(id)
    await role.delete()
  })

  it('Create role', async () => {
    const role = await space.createRole(roleDefinition)
    expect(role.name).toBe('Content Editor')
    role.name = 'updatedname'
    const updatedRole = await role.update()
    expect(updatedRole.name).toBe('updatedname')
    await updatedRole.delete()
  })
})

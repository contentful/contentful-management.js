import { describe, expectTypeOf, it } from 'vitest'
import type {
  CreateDataAssemblyProps,
  DataAssemblyProps,
  UpdateDataAssemblyProps,
} from './data-assembly'

const writeBody = {
  metadata: { tags: [] },
  name: 'Assembly',
  description: '',
  parameters: [],
  resolvers: {},
  return: {},
}

describe('Data Assembly write payloads', () => {
  it('accept a body without top-level sys', () => {
    expectTypeOf(writeBody).toExtend<CreateDataAssemblyProps>()
    expectTypeOf(writeBody).toExtend<UpdateDataAssemblyProps>()
  })

  it('reject a body with top-level sys', () => {
    const legacyBody = { ...writeBody, sys: { type: 'DataAssembly' as const, dataType: [] } }
    expectTypeOf(legacyBody).not.toExtend<CreateDataAssemblyProps>()
    expectTypeOf(legacyBody).not.toExtend<UpdateDataAssemblyProps>()
    expectTypeOf<DataAssemblyProps>().not.toExtend<UpdateDataAssemblyProps>()
  })
})

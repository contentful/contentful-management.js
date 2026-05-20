import { describe, test, expectTypeOf } from 'vitest'
import type {
  DataAssemblyReturnMappingValue,
  DataAssemblyReturnMappingFromObject,
  DataAssemblyReturnMappingSelectValue,
} from '../../../lib/entities/data-assembly'

describe('DataAssembly ReturnMapping types', () => {
  test('DataAssemblyReturnMappingFromObject has $from with source', () => {
    expectTypeOf<DataAssemblyReturnMappingFromObject['$from']['source']>().toBeString()
  })

  test('DataAssemblyReturnMappingFromObject $from.select is optional DataAssemblyReturnMappingSelectValue', () => {
    expectTypeOf<DataAssemblyReturnMappingFromObject['$from']>().toHaveProperty('select')
  })

  test('DataAssemblyReturnMappingSelectValue accepts string', () => {
    expectTypeOf<string>().toMatchTypeOf<DataAssemblyReturnMappingSelectValue>()
  })

  test('ReturnMappingValue accepts $from variant', () => {
    const fromBinding: DataAssemblyReturnMappingValue = {
      $from: {
        source: 'resolver1',
        select: 'fieldName',
      },
    }
    expectTypeOf(fromBinding).toMatchTypeOf<DataAssemblyReturnMappingValue>()
  })

  test('ReturnMappingValue accepts $on type dispatch via $from select', () => {
    const withTypeDispatch: DataAssemblyReturnMappingValue = {
      $from: {
        source: 'resolver1',
        select: {
          $on: {
            type: {
              BlogPost: 'title',
              Page: 'heading',
            },
            default: 'name',
          },
        },
      },
    }
    expectTypeOf(withTypeDispatch).toMatchTypeOf<DataAssemblyReturnMappingValue>()
  })

  test('ReturnMappingValue still accepts simple string', () => {
    expectTypeOf<string>().toMatchTypeOf<DataAssemblyReturnMappingValue>()
  })

  test('ReturnMappingValue still accepts nested Record', () => {
    const nested: DataAssemblyReturnMappingValue = {
      title: 'resolver1.title',
      author: {
        name: 'resolver1.author.name',
      },
    }
    expectTypeOf(nested).toMatchTypeOf<DataAssemblyReturnMappingValue>()
  })
})

import { describe, expectTypeOf, it } from 'vitest'
import type { OptionalDefaults } from './wrap'

describe('OptionalDefaults', () => {
  it('does not add props', () => {
    type Result = OptionalDefaults<{
      foo: string
    }>

    type Expected = {
      foo: string
    }

    expectTypeOf<Expected>().toMatchTypeOf<Result>()
  })

  it('adds default props if available', () => {
    type Result = OptionalDefaults<{
      foo: string
      environmentId: string
    }>

    type Expected = {
      foo: string
      environmentId?: string
    }

    expectTypeOf<Result>().toMatchTypeOf<Expected>()
  })
})

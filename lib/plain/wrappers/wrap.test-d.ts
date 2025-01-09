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

  it('handles intersection types', () => {
    type Result = OptionalDefaults<{ foo1: 'bar1' } | { foo2: 'bar2' }>

    type Expected = { foo1: 'bar1' } | { foo2: 'bar2' }

    expectTypeOf<Result>().toMatchTypeOf<Expected>()
  })

  it('handles union with intersection types', () => {
    type Result = OptionalDefaults<{ spaceId: string } & ({ foo1: 'bar1' } | { foo2: 'bar2' })>

    type Expected =
      | { spaceId?: string | undefined; foo1: 'bar1' }
      | { spaceId?: string | undefined; foo2: 'bar2' }

    expectTypeOf<Result>().toMatchTypeOf<Expected>()
  })
})

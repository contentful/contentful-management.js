import { describe, expectTypeOf, it } from 'vitest'
import type { ComponentProps } from './component'
import type { ComponentTypeProps, ComponentTypeViewport } from './component-type'
import type { ExperienceProps } from './experience'
import type { ExperienceFragmentProps } from './experience-fragment'
import type { ExperienceTemplateProps } from './experience-template'
import type { FragmentProps } from './fragment'
import type { TemplateProps } from './template'

describe('ExO entity props', () => {
  it('accepts responses without the deprecated viewports field', () => {
    expectTypeOf<ComponentProps['viewports']>().toEqualTypeOf<ComponentTypeViewport[] | undefined>()
    expectTypeOf<ComponentTypeProps['viewports']>().toEqualTypeOf<
      ComponentTypeViewport[] | undefined
    >()
    expectTypeOf<ExperienceProps['viewports']>().toEqualTypeOf<
      ComponentTypeViewport[] | undefined
    >()
    expectTypeOf<ExperienceFragmentProps['viewports']>().toEqualTypeOf<
      ComponentTypeViewport[] | undefined
    >()
    expectTypeOf<ExperienceTemplateProps['viewports']>().toEqualTypeOf<
      ComponentTypeViewport[] | undefined
    >()
    expectTypeOf<FragmentProps['viewports']>().toEqualTypeOf<ComponentTypeViewport[] | undefined>()
    expectTypeOf<TemplateProps['viewports']>().toEqualTypeOf<ComponentTypeViewport[] | undefined>()
  })
})

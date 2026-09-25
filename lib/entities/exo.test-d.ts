import { describe, expectTypeOf, it } from 'vitest'
import type { ComponentProps } from './component'
import type {
  ComponentTypeProps,
  ComponentTypeViewport,
  DesignPropertyValue,
  DimensionedDesignPropertyValue,
} from './component-type'
import type { ExperienceProps, InlineExperienceFragmentNode } from './experience'
import type { ExperienceFragmentProps } from './experience-fragment'
import type { ExperienceTemplateProps } from './experience-template'
import type { FragmentProps, InlineFragmentNode } from './fragment'
import type { TemplateProps } from './template'

type ViewportOptionalDesignProperties = Record<
  string,
  DesignPropertyValue | DimensionedDesignPropertyValue
>

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

  it('accepts flattened design property values when viewports are absent', () => {
    expectTypeOf<
      ExperienceProps['designProperties']
    >().toEqualTypeOf<ViewportOptionalDesignProperties>()
    expectTypeOf<
      ExperienceFragmentProps['designProperties']
    >().toEqualTypeOf<ViewportOptionalDesignProperties>()
    expectTypeOf<
      FragmentProps['designProperties']
    >().toEqualTypeOf<ViewportOptionalDesignProperties>()
    expectTypeOf<
      InlineExperienceFragmentNode['designProperties']
    >().toEqualTypeOf<ViewportOptionalDesignProperties>()
    expectTypeOf<
      InlineFragmentNode['designProperties']
    >().toEqualTypeOf<ViewportOptionalDesignProperties>()
  })
})

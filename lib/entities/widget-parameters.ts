type ParameterType = 'Boolean' | 'Symbol' | 'Number' | 'Enum'
type ParameterOption = string | { [key: string]: string }

export interface ParameterDefinition {
  name: string
  id: string
  description?: string
  type: ParameterType
  required?: boolean
  default?: boolean | string | number
  options?: ParameterOption[]
  labels?: {
    empty?: string
    true?: string
    false?: string
  }
}

export type DefinedParameters = Record<string, string | number | boolean>
export type FreeFormParameters = Record<string, any> | Array<any> | number | string | boolean

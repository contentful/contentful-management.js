/**
 * @module
 * @category Entities
 */
/** Supported widget parameter data types */
export type ParameterType = 'Boolean' | 'Symbol' | 'Number' | 'Enum'
/** Widget parameter types including Secret for installation parameters */
export type InstallationParameterType = ParameterType | 'Secret'
/** A selectable option for a widget parameter */
export type ParameterOption = string | { [key: string]: string }

/** Definition of a configurable widget parameter */
export interface ParameterDefinition<T = ParameterType> {
  name: string
  id: string
  description?: string
  type: T
  required?: boolean
  default?: boolean | string | number
  options?: ParameterOption[]
  labels?: {
    empty?: string
    true?: string
    false?: string
  }
}

/** A record of parameter values keyed by parameter ID */
export type DefinedParameters = Record<string, string | number | boolean>
/** Free-form parameter values that can be any JSON-compatible type */
export type FreeFormParameters = Record<string, any> | Array<any> | number | string | boolean

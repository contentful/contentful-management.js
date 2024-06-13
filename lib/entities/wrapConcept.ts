import { MakeRequest } from '../common-types'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { ConceptProps } from './concept'

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw concept data
 * @return Wrapped concept data
 */

export function wrapConcept(makeRequest: MakeRequest, data: ConceptProps): ConceptProps {
  const concept = toPlainObject(copy(data))
  // const entryWithMethods = enhanceWithMethods(entry, createEntryApi(makeRequest))
  // return freezeSys(entryWithMethods)
  return freezeSys(concept)
}

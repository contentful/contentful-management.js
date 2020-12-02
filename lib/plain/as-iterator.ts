import { QueryParams, CollectionProp } from './endpoints/common-types'
import copy from 'fast-copy'

type IterableFn<P = any, T = any> = (params: P) => Promise<CollectionProp<T>>
type ParamsType<T extends IterableFn> = T extends (params: infer P) => any ? P : never

export const asIterator = <P extends QueryParams, T, F extends IterableFn<P, T>>(
  fn: F,
  params: ParamsType<F>
): AsyncIterable<T> => {
  return {
    [Symbol.asyncIterator]() {
      let options = copy(params)
      const get = () => fn(copy(options))
      let currentResult = get()

      return {
        current: 0,
        async next() {
          const { total, items, skip, limit } = await currentResult

          if (total === this.current) {
            return { done: true, value: null }
          }

          const value = items[this.current++ - skip]
          const endOfPage = this.current % limit === 0
          const endOfList = this.current === total

          if (endOfPage && !endOfList) {
            options = {
              ...options,
              query: {
                ...options.query,
                skip: skip + limit,
              },
            }
            currentResult = get()
          }

          return { done: false, value }
        },
      }
    },
  }
}

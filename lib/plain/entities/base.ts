import { RawAxiosRequestHeaders } from 'axios'
import { OptionalDefaults } from '../wrappers/wrap'

export type CreateOrUpdate<T, Props, ReturnProps> = <T, Props, ReturnProps>(
  params: OptionalDefaults<T>,
  rawData: Props,
  headers?: RawAxiosRequestHeaders
) => Promise<ReturnProps>

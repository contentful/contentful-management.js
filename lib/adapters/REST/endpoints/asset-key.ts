import type { AxiosInstance } from 'contentful-sdk-core'
import { CreateAssetKeyProps, AssetKeyProps } from '../../../entities/asset-key'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetSpaceEnvironmentParams } from '../../../common-types'

const ASSET_KEY_MAX_LIFETIME = 48 * 60 * 60

export class ValidationError extends Error {
  constructor(name: string, message: string) {
    super(`Invalid "${name}" provided, ` + message)
    this.name = 'ValidationError'
  }
}

interface ValidateTimestampOptions {
  maximum?: number
  now?: number
}

const validateTimestamp = (name: string, timestamp: number, options: ValidateTimestampOptions) => {
  options = options || {}

  if (typeof timestamp !== 'number') {
    throw new ValidationError(
      name,
      `only numeric values are allowed for timestamps, provided type was "${typeof timestamp}"`
    )
  }
  if (options.maximum && timestamp > options.maximum) {
    throw new ValidationError(
      name,
      `value (${timestamp}) cannot be further in the future than expected maximum (${options.maximum})`
    )
  }
  if (options.now && timestamp < options.now) {
    throw new ValidationError(
      name,
      `value (${timestamp}) cannot be in the past, current time was ${options.now}`
    )
  }
}

export const create: RestEndpoint<'AssetKey', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: CreateAssetKeyProps
) => {
  const expiresAt = data.expiresAt
  const now = Math.floor(Date.now() / 1000)
  const currentMaxLifetime = now + ASSET_KEY_MAX_LIFETIME
  validateTimestamp('expiresAt', expiresAt, { maximum: currentMaxLifetime, now })

  const postParams = { expiresAt }

  return raw.post<AssetKeyProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/asset_keys`,
    postParams
  )
}

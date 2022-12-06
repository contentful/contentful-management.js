import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import { EnvironmentTemplateProps } from '../../../entities/environment-template'
import { RestEndpoint } from '../types'
import * as raw from './raw'

const apiPath = (organizationId: string, ...pathSegments: (number | string)[]) =>
  `/organizations/${organizationId}/environment_templates/` + pathSegments.join('/')

export const get: RestEndpoint<'EnvironmentTemplate', 'get'> = (
  http,
  { organizationId, environmentTemplateId, version }
) =>
  version
    ? raw.get(http, apiPath(organizationId, environmentTemplateId, 'versions', version))
    : raw.get(http, apiPath(organizationId, environmentTemplateId))

export const getMany: RestEndpoint<'EnvironmentTemplate', 'getMany'> = (
  http,
  { organizationId, query = {} }
) => raw.get(http, apiPath(organizationId), { params: query })

export const create: RestEndpoint<'EnvironmentTemplate', 'create'> = (
  http,
  { organizationId },
  payload
) => raw.post(http, apiPath(organizationId), payload)

export const update: RestEndpoint<'EnvironmentTemplate', 'update'> = (
  http,
  { organizationId, environmentTemplateId },
  payload
) => {
  const data: SetOptional<EnvironmentTemplateProps, 'sys'> = copy(payload)
  delete data.sys

  return raw.put(http, apiPath(organizationId, environmentTemplateId), data, {
    headers: {
      'X-Contentful-Version': payload.sys.version ?? 0,
    },
  })
}

export const versionUpdate: RestEndpoint<'EnvironmentTemplate', 'versionUpdate'> = (
  http,
  { organizationId, version, environmentTemplateId },
  payload
) => raw.patch(http, apiPath(organizationId, environmentTemplateId, 'versions', version), payload)

export const del: RestEndpoint<'EnvironmentTemplate', 'delete'> = (
  http,
  { organizationId, environmentTemplateId }
) => raw.del(http, apiPath(organizationId, environmentTemplateId))

export const versions: RestEndpoint<'EnvironmentTemplate', 'versions'> = (
  http,
  { organizationId, environmentTemplateId, query = {} }
) => raw.get(http, apiPath(organizationId, environmentTemplateId, 'versions'), { params: query })

export const validate: RestEndpoint<'EnvironmentTemplate', 'validate'> = (
  http,
  { spaceId, environmentId, environmentTemplateId, version },
  payload
) =>
  raw.put(
    http,
    version
      ? `/spaces/${spaceId}/environments/${environmentId}/template_installations/${environmentTemplateId}/versions/${version}/validated`
      : `/spaces/${spaceId}/environments/${environmentId}/template_installations/${environmentTemplateId}/validated`,
    payload
  )

export const install: RestEndpoint<'EnvironmentTemplate', 'install'> = (
  http,
  { spaceId, environmentId, environmentTemplateId },
  payload
) =>
  raw.post(
    http,
    `/spaces/${spaceId}/environments/${environmentId}/template_installations/${environmentTemplateId}/versions`,
    payload
  )

export const disconnect: RestEndpoint<'EnvironmentTemplate', 'disconnect'> = (
  http,
  { spaceId, environmentId, environmentTemplateId }
) =>
  raw.del(
    http,
    `/spaces/${spaceId}/environments/${environmentId}/template_installations/${environmentTemplateId}`
  )

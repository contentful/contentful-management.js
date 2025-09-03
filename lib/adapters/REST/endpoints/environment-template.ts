import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type { EnvironmentTemplateProps } from '../../../entities/environment-template.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'
import type { RawAxiosRequestHeaders } from 'axios'

const apiPath = (organizationId: string, ...pathSegments: (number | string)[]) =>
  `/organizations/${organizationId}/environment_templates/` + pathSegments.join('/')

export const get: RestEndpoint<'EnvironmentTemplate', 'get'> = (
  http,
  { organizationId, environmentTemplateId, version, query = {} },
  headers?: RawAxiosRequestHeaders,
) =>
  version
    ? raw.get(http, apiPath(organizationId, environmentTemplateId, 'versions', version), {
        params: query,
        headers,
      })
    : raw.get(http, apiPath(organizationId, environmentTemplateId), {
        params: query,
        headers,
      })

export const getMany: RestEndpoint<'EnvironmentTemplate', 'getMany'> = (
  http,
  { organizationId, query = {} },
  headers?: RawAxiosRequestHeaders,
) => raw.get(http, apiPath(organizationId), { params: query, headers })

export const create: RestEndpoint<'EnvironmentTemplate', 'create'> = (
  http,
  { organizationId },
  payload,
  headers?: RawAxiosRequestHeaders,
) => raw.post(http, apiPath(organizationId), payload, { headers })

export const update: RestEndpoint<'EnvironmentTemplate', 'update'> = (
  http,
  { organizationId, environmentTemplateId },
  payload,
  headers?: RawAxiosRequestHeaders,
) => {
  const data: SetOptional<EnvironmentTemplateProps, 'sys'> = copy(payload)
  delete data.sys

  return raw.put(http, apiPath(organizationId, environmentTemplateId), data, {
    headers: {
      'X-Contentful-Version': payload.sys.version ?? 0,
      ...headers,
    },
  })
}

export const versionUpdate: RestEndpoint<'EnvironmentTemplate', 'versionUpdate'> = (
  http,
  { organizationId, version, environmentTemplateId },
  payload,
  headers?: RawAxiosRequestHeaders,
) =>
  raw.patch(http, apiPath(organizationId, environmentTemplateId, 'versions', version), payload, {
    headers,
  })

export const del: RestEndpoint<'EnvironmentTemplate', 'delete'> = (
  http,
  { organizationId, environmentTemplateId },
  headers?: RawAxiosRequestHeaders,
) => raw.del(http, apiPath(organizationId, environmentTemplateId), { headers })

export const versions: RestEndpoint<'EnvironmentTemplate', 'versions'> = (
  http,
  { organizationId, environmentTemplateId, query = {} },
  headers?: RawAxiosRequestHeaders,
) =>
  raw.get(http, apiPath(organizationId, environmentTemplateId, 'versions'), {
    params: query,
    headers,
  })

export const validate: RestEndpoint<'EnvironmentTemplate', 'validate'> = (
  http,
  { spaceId, environmentId, environmentTemplateId, version },
  payload,
  headers?: RawAxiosRequestHeaders,
) =>
  raw.put(
    http,
    version
      ? `/spaces/${spaceId}/environments/${environmentId}/template_installations/${environmentTemplateId}/versions/${version}/validated`
      : `/spaces/${spaceId}/environments/${environmentId}/template_installations/${environmentTemplateId}/validated`,
    payload,
    { headers },
  )

export const install: RestEndpoint<'EnvironmentTemplate', 'install'> = (
  http,
  { spaceId, environmentId, environmentTemplateId },
  payload,
  headers?: RawAxiosRequestHeaders,
) =>
  raw.post(
    http,
    `/spaces/${spaceId}/environments/${environmentId}/template_installations/${environmentTemplateId}/versions`,
    payload,
    { headers },
  )

export const disconnect: RestEndpoint<'EnvironmentTemplate', 'disconnect'> = (
  http,
  { spaceId, environmentId, environmentTemplateId },
  headers?: RawAxiosRequestHeaders,
) =>
  raw.del(
    http,
    `/spaces/${spaceId}/environments/${environmentId}/template_installations/${environmentTemplateId}`,
    { headers },
  )

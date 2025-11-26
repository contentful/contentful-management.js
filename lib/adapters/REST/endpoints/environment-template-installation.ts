import type { RawAxiosRequestHeaders } from 'axios'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

const apiPath = (organizationId: string, ...pathSegments: (number | string)[]) =>
  `/organizations/${organizationId}/environment_templates/` + pathSegments.join('/')

export const getMany: RestEndpoint<'EnvironmentTemplateInstallation', 'getMany'> = (
  http,
  { organizationId, environmentTemplateId, spaceId, environmentId, ...otherProps },
  headers?: RawAxiosRequestHeaders,
) =>
  raw.get(http, apiPath(organizationId, environmentTemplateId, 'template_installations'), {
    params: {
      ...otherProps,
      ...(environmentId && { 'environment.sys.id': environmentId }),
      ...(spaceId && { 'space.sys.id': spaceId }),
    },
    headers,
  })

export const getForEnvironment: RestEndpoint<
  'EnvironmentTemplateInstallation',
  'getForEnvironment'
> = (
  http,
  { spaceId, environmentId, environmentTemplateId, installationId, ...paginationProps },
  headers?: RawAxiosRequestHeaders,
) =>
  raw.get(
    http,
    `/spaces/${spaceId}/environments/${environmentId}/template_installations/${environmentTemplateId}`,
    {
      params: {
        ...(installationId && { 'sys.id': installationId }),
        ...paginationProps,
      },
      headers,
    },
  )

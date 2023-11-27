import { RawAxiosRequestHeaders } from 'axios'
import { RestEndpoint } from '../types'
import * as raw from './raw'

const apiPath = (organizationId: string, ...pathSegments: (number | string)[]) =>
  `/organizations/${organizationId}/environment_templates/` + pathSegments.join('/')

export const getMany: RestEndpoint<'EnvironmentTemplateInstallation', 'getMany'> = (
  http,
  { organizationId, environmentTemplateId, spaceId, environmentId, ...paginationProps },
  headers?: RawAxiosRequestHeaders
) =>
  raw.get(http, apiPath(organizationId, environmentTemplateId, 'template_installations'), {
    params: {
      ...paginationProps,
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
  headers?: RawAxiosRequestHeaders
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
    }
  )

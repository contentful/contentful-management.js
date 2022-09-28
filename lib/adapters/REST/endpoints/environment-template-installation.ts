import { RestEndpoint } from '../types'
import * as raw from './raw'

const apiPath = (organizationId: string, ...pathSegments: (number | string)[]) =>
  `/organizations/${organizationId}/environment_templates/` + pathSegments.join('/')

export const getMany: RestEndpoint<'EnvironmentTemplateInstallation', 'getMany'> = (
  http,
  { organizationId, templateId, spaceId, environmentId, ...paginationProps }
) =>
  raw.get(http, apiPath(organizationId, templateId, 'template_installations'), {
    params: {
      ...paginationProps,
      ...(environmentId && { 'environment.sys.id': environmentId }),
      ...(spaceId && { 'space.sys.id': spaceId }),
    },
  })

export const getForEnvironment: RestEndpoint<
  'EnvironmentTemplateInstallation',
  'getForEnvironment'
> = (http, { spaceId, environmentId, templateId, installationId, ...paginationProps }) =>
  raw.get(
    http,
    `/spaces/${spaceId}/environments/${environmentId}/template_installations/${templateId}`,
    {
      params: {
        ...(installationId && { 'sys.id': installationId }),
        ...paginationProps,
      },
    }
  )

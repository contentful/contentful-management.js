import { describe, it, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'
import * as rest from '../../../../../lib/adapters/REST/endpoints/app-action'
import type { CreateAppActionProps } from '../../../../../lib/entities/app-action'

describe('AppAction schema fields', () => {
  it('passes parametersSchema/resultSchema on create', async () => {
    const payload: CreateAppActionProps = {
      category: 'Notification.v1.0',
      url: 'https://example.com',
      name: 'My Action',
      parametersSchema: { type: 'object', properties: { a: { type: 'string' } } },
      resultSchema: { type: 'object', properties: { ok: { type: 'boolean' } } },
    }

    const { httpMock } = setupRestAdapter(
      Promise.resolve({ data: { sys: { id: 'id' }, ...payload } }),
      {}
    )

    await rest.create(
      httpMock as unknown as import('contentful-sdk-core').AxiosInstance,
      {
        organizationId: 'org',
        appDefinitionId: 'appDef',
      } as unknown as import('../../../../../lib/common-types').GetAppDefinitionParams,
      payload as unknown as never
    )

    expect(httpMock.post.mock.calls[0][1]).toStrictEqual(payload)
  })

  it('passes parametersSchema/resultSchema on update', async () => {
    const payload: CreateAppActionProps = {
      category: 'Notification.v1.0',
      url: 'https://example.com',
      name: 'My Action',
      parametersSchema: { type: 'object', properties: { a: { type: 'string' } } },
      resultSchema: { type: 'object', properties: { ok: { type: 'boolean' } } },
    }

    const { httpMock } = setupRestAdapter(
      Promise.resolve({ data: { sys: { id: 'id' }, ...payload } }),
      {}
    )

    await rest.update(
      httpMock as unknown as import('contentful-sdk-core').AxiosInstance,
      {
        organizationId: 'org',
        appDefinitionId: 'appDef',
        appActionId: 'id',
      } as unknown as import('../../../../../lib/common-types').GetAppActionParams,
      payload as unknown as never
    )

    expect(httpMock.put.mock.calls[0][1]).toStrictEqual(payload)
  })
})

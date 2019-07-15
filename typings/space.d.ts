import { DefaultElements } from './defaultElements'
import { MetaSys } from './meta'
import { ApiKey, CreateApiKeyProps } from './apiKey'
import { Collection } from './collection'
import { Environment } from './environment'
import { Asset } from './asset'

export interface SpaceProps {
  name: string
}

export interface ContentfulSpaceAPI {
  delete(): Promise<void>,
  update(): Promise<void>,
  createApiKey(data: CreateApiKeyProps): Promise<ApiKey>,
  createApiKeyWithId(id: string, data: CreateApiKeyProps): Promise<ApiKey>,
  createAsset(data: Object): Promise<Asset>,
  getEnvironments(): Promise<Collection<Environment>>,
  getEnvironment(id: string): Promise<Environment>,
}

export interface Space extends SpaceProps, DefaultElements<SpaceProps & MetaSys>, MetaSys, ContentfulSpaceAPI {}

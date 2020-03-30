import { DefaultElements } from './defaultElements'
import { MetaSys, MetaSysProps, MetaLinkProps } from './meta'

export interface AppInstallationProps {
  parameters: {
    [key: string]: string
  }
}

interface AppInstallationMetaSys extends MetaSys<MetaSysProps> {
  appDefinition: { sys: MetaLinkProps }
}

export interface AppInstallation
  extends AppInstallationProps,
    DefaultElements<AppInstallationProps & AppInstallationMetaSys>,
    MetaSys<MetaSysProps> {
  update(): Promise<AppInstallation>,
  delete(): Promise<void>,
}

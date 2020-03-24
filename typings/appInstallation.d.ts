import { DefaultElements } from './defaultElements'
import { MetaSys, MetaSysProps } from './meta'

export interface AppInstallationProps {
  parameters: {
    [key: string]: string
  }
}

export interface AppInstallation
  extends AppInstallationProps,
    DefaultElements<AppInstallationProps & MetaSys<MetaSysProps>>,
    MetaSys<MetaSysProps> {
  update(): Promise<AppInstallation>,
  delete(): Promise<void>,
}

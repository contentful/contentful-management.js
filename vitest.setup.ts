import { version } from './package.json'

window.global ||= window

global.__VERSION__ = version

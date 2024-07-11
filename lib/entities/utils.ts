export type LocalizedEntity<
  Entity,
  LocalizedFields extends keyof Entity,
  Locales extends string
> = {
  [K in keyof Entity]: K extends LocalizedFields ? { [Locale in Locales]: Entity[K] } : Entity[K]
}

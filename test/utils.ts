export function makeLink(type, id) {
  return {
    sys: { id, linkType: type, type: 'Link' },
  }
}

export function makeVersionedLink(type, id, version: number) {
  return {
    sys: { id, linkType: type, type: 'Link', version },
  }
}

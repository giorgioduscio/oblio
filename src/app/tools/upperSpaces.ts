export function upperSpaces(phrase:string) {
  return phrase[0].toUpperCase() +phrase.slice(1) .replaceAll('_',' ')
}
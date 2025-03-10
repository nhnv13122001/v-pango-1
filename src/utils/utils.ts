export const objectToString = (object: unknown) => {
  return JSON.stringify(object)
}

export const stringToObject = (string: string) => {
  return JSON.parse(string)
}

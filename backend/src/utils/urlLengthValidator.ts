export const urlLengthValidator = (longUrl: string): boolean => {
  const MAX_URL_LENGTH = 1000
  return longUrl.length <= MAX_URL_LENGTH
}

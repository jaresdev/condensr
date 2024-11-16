import URL from '../models/url'

const urlsInDB = async () => {
  const urls = await URL.find({})
  return urls.map((Url) => Url.toJSON())
}

export default {
  urlsInDB,
}

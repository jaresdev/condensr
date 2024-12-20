import { useState } from 'react'
import Form from '@/components/Form'
import ShortenedLinkResult from '@/components/ShortenedLinkResult'
import Loader from '@/components/Loader'

const ShortenerPage = ({ apiUrl }: { apiUrl: String }) => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [generating, setGenerating] = useState(false)

  const urlRegex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{1,256}\.[a-z]{2,6}(\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/i

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!url) {
      setErrorMessage('URL is mandatory!')
      return
    }

    if (!urlRegex.test(url)) {
      setErrorMessage('Please enter a valid URL.')
      return
    }

    try {
      setGenerating(true)
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl: url }),
      })

      if (response.ok) {
        const data = await response.json()
        setShortUrl(data.shortUrl)
      } else {
        const error = (await response.json()).error
        setErrorMessage(error)
      }

      setGenerating(false)
    } catch (e) {
      window.location.href = '/500'
    }
  }

  const resetState = () => {
    setUrl('')
    setShortUrl('')
    setErrorMessage('')
  }

  return (
    <>
      {generating ? (
        <Loader />
      ) : !shortUrl ? (
        <Form
          handleSubmit={handleSubmit}
          setUrl={setUrl}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <ShortenedLinkResult shortUrl={shortUrl} resetState={resetState} />
      )}
    </>
  )
}

export default ShortenerPage

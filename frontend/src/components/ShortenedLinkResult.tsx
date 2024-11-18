interface ShortenedLinkResultProps {
  shortUrl: string
  resetState: () => void
}

const ShortenedLinkResult: React.FC<ShortenedLinkResultProps> = ({
  shortUrl,
  resetState,
}) => {
  return (
    <div className="w-full flex flex-col gap-10 items-center">
      <div
        className="w-full flex flex-col md:flex-row gap-5 items-center 
        justify-center"
      >
        <button
          className="p-3 rounded-lg focus:outline-none
        bg-primary ring-2 ring-primary text-white font-semibold
          active:shadow-inner active:translate-y-1 hover:ring-tertiary
          hover:bg-tertiary"
          onClick={() => navigator.clipboard.writeText(shortUrl)}
        >
          📋 Copy
        </button>
        <a
          className="p-3 font-light text-lg lg:text-2xl text-tertiary underline"
          href={shortUrl}
          target="_blank"
        >
          {shortUrl}
        </a>
      </div>
      <button
        className="w-fit p-3 rounded-lg ring-2 ring-primary text-textPrimary 
        active:translate-y-1 hover:ring-tertiary hover:bg-tertiary 
        hover:text-white"
        onClick={resetState}
      >
        <span className="mr-2">←</span>Go back to Home
      </button>
    </div>
  )
}

export default ShortenedLinkResult

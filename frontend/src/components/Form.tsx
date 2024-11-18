import React from 'react'

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setUrl: (url: string) => void
  errorMessage: string
  setErrorMessage: (message: string) => void
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  errorMessage,
  setErrorMessage,
  setUrl,
}) => {
  return (
    <form
      className="w-full h-20 flex flex-col lg:flex-row lg:flex-wrap"
      onSubmit={handleSubmit}
    >
      <div className="w-full lg:w-auto lg:grow order-1 md:order-1">
        <div className="relative w-full mb-2 px-1">
          <div className="absolute inset-0 start-0 flex items-center ps-4 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B2B2B2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-8 icon icon-tabler icons-tabler-outline icon-tabler-link"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 15l6 -6" />
              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
              <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
            </svg>
          </div>
          <input
            type="text"
            className={`w-full p-3 ps-14 ring-2 rounded-lg focus:outline-none 
                focus:ring-2 required
                ${
                  errorMessage
                    ? 'ring-errorBorder focus:ring-errorBorder'
                    : 'ring-secondary focus:ring-primary'
                }`}
            placeholder="https://www.google.com"
            onChange={({ target }) => {
              if (target.value) setErrorMessage('')
              setUrl(target.value)
            }}
          />
        </div>
      </div>
      <div className="w-full order-2 lg:order-3 px-1 mb-4 lg:mb-0">
        {errorMessage ? (
          <span className="text-errorText/70 text-sm font-light">
            {errorMessage}
          </span>
        ) : (
          ''
        )}
      </div>
      <div className="w-full lg:w-auto lg:flex-none order-3 lg:order-2">
        <div className="relative w-full mb-2 px-1">
          <button
            className="w-full p-3 rounded-lg focus:outline-none
              bg-primary ring-2 ring-primary text-white font-semibold
                active:shadow-inner active:translate-y-1 hover:ring-tertiary
                hover:bg-tertiary"
            type="submit"
          >
            Generate Short URL
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form

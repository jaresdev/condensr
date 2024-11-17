import React, { useState } from "react";

const Form = () => {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url) setErrorMessage("URL is mandatory!");
  };

  return (
    <>
      <form
        className="w-full h-40 md:h-20 box-border flex flex-col md:flex-row gap-8 p-3"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <div
            className="
          absolute inset-0 start-0 flex items-center ps-4 md:ps-8 pointer-events-none
        "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ACAFB4"
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
            id="condenst-input"
            className={`block w-full h-full mb-2 md:ml-5 ps-14 p-3 ring-2 rounded-lg 
              focus:outline-none focus:ring-2 required
            ${
              errorMessage
                ? "ring-errorBorder focus:ring-errorBorder"
                : "ring-secondary focus:ring-primary"
            }`}
            placeholder="https://www.google.com"
            onChange={({ target }) => {
              if (target.value) setErrorMessage("");
              setUrl(target.value);
            }}
          />
          {errorMessage ? (
            <span className="md:ml-5 text-errorText/70 text-sm font-light">
              {!url && errorMessage}
            </span>
          ) : (
            ""
          )}
        </div>
        <button
          className="flex-shrink-0 rounded-md px-6 py-3
            bg-primary text-white font-semibold
            hover:bg-tertiary active:shadow-inner active:translate-y-[2px]
              ring-2 ring-primary hover:ring-tertiary"
          type="submit"
        >
          Generate Short URL
        </button>
      </form>
    </>
  );
};

export default Form;

import React, { useState } from "react";

const Form = () => {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const urlRegex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{1,256}\.[a-z]{2,6}(\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/i;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url) {
      setErrorMessage("URL is mandatory!");
      return;
    }

    if (!urlRegex.test(url)) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }
  };

  return (
    <>
      <form
        className="w-full h-20 flex flex-col lg:flex-row lg:flex-wrap"
        onSubmit={handleSubmit}
      >
        <div className="w-full lg:w-auto lg:grow order-1 md:order-1">
          <div className="relative w-full mb-2 px-1">
            <input
              type="text"
              className={`w-full p-3 ring-2 rounded-lg focus:outline-none 
              focus:ring-2 required
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
          </div>
        </div>
        <div className="w-full order-2 lg:order-3 px-1 mb-4 lg:mb-0">
          {errorMessage ? (
            <span className="text-errorText/70 text-sm font-light">
              {errorMessage}
            </span>
          ) : (
            ""
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
    </>
  );
};

export default Form;

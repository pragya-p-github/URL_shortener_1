import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const ShortenUrlForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [note, setNote] = useState("");

  const handleShortenUrl = async () => {
    try {
      const response = await axios.post("http://localhost:8000/url", {
        url: originalUrl,
        note: note,
      });

      const { data } = response;
      setShortUrl(`http://localhost:8000/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shorten-url-form ">
        <ul>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter URL"
        className="input"
      />
      </ul>
      <ul>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter note"
        className="input"
        id="note"
      />
      </ul>
      <button onClick={handleShortenUrl} className="button">Shorten</button>

      {shortUrl && (
        <div>
          <h2>Short URL:</h2>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="shortened-URL">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortenUrlForm;

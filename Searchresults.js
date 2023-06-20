import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const SearchResults = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOption, setSearchOption] = useState("shortUrl");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/url/search?keyword=${searchKeyword}&option=${searchOption}`
      );

      const { data } = response;

      const formattedResults = data.results.map((result) => {
        const { shortId, redirectURL, note, lastClicked } = result;

        return {
          shortId,
          redirectURL,
          note,
          latestClickTimestamp: lastClicked ? new Date(lastClicked).toLocaleString() : "N/A",
        };
      });

      setSearchResults(formattedResults);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-results">
      <h2>Search URL</h2>
      <ul className="list">
        <label htmlFor="searchOption">Search by:     </label>
      <select
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
        className="dropdown"
        placeholder="Select search option"
      >
        <option value="shortUrl">Short URL</option>
        <option value="originalUrl">Original URL</option>
        <option value="notes">Notes</option>
      </select>
      </ul>
      <ul>
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Enter search keyword"
        className="input"
      />
      </ul>
      <button onClick={handleSearch} className="button">Search</button>

      {searchResults.length > 0 && (
        <div>
          <h1>Search Results:</h1>
          <ul>
            {searchResults.map((result) => (
              <ul key={result.shortId} className="searchs">
                <a
                  href={`http://localhost:8000/${result.redirectURL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {result.redirectURL}
                </a>
                <ul>
                  Last Clicked at :{" "}
                  {result.latestClickTimestamp
                    ? new Date(result.latestClickTimestamp).toLocaleString()
                    : "N/A"}
                </ul>
              </ul>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

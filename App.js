import React from "react";
import ShortenUrlForm from "./Shorternurl";
import SearchResults from "./Searchresults";
import "./App.css";

const App = () => {
  return (
    <div>
      <div className="header">
        <h1>URL Shortener</h1>
        <p>Shorten your long URLs for easy sharing</p>
      </div>
      <div className="container">
      <div className="shorten-url-form">
        <ShortenUrlForm />
      </div>
      <div className="search-results">
        <SearchResults />
      </div>
      </div>
    </div>
  );
};

export default App;

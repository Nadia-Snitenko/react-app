import React, { useState, useEffect } from 'react';

const stops = [
    "Railway Station",
    "TsUM Samara - Suburban Bus Station",
    "Gubernskiy Market",
    "Michurinsky Square",
    "Memorial Square",
    "Samara Aerospace University"
  ]; 

  const Search = () => {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    React.useEffect(() => {
        const results = stops.filter(stop =>
        stop.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);


    return(
        <div>
        <input
        type="text"
        placeholder="Search"
        value={searchTerm.toLowerCase()}
        onChange={handleChange}
      />
      <ul>
         {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      </div>

    );

  }
  export default Search;
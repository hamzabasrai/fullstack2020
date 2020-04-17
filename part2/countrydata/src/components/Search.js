import React from "react";

const Search = ({ search, handleSearchChange }) => {
  return (
    <div>
      Find Countries: <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default Search;

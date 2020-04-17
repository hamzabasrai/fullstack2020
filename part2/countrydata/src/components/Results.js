import React from "react";
import Country from "./Country";

const SingleResult = ({ country, handleShowClick }) => (
  <div>
    <p style={{ display: "inline" }}>{country.name} </p>
    <button onClick={handleShowClick(country.name)}>Show</button>
  </div>
);

const Results = ({ countries, handleShowClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <SingleResult
            key={country.name}
            country={country}
            handleShowClick={handleShowClick}
          />
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return <p>No country found</p>;
  }
};
export default Results;

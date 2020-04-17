import React from "react";
import Country from "./Country";

const Results = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1 && countries.length <= 10) {
    return countries.map((country) => <p key={country.name}>{country.name}</p>);
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return <p>No country found</p>;
  }
};
export default Results;

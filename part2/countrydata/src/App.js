import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://restcountries.eu/rest/v2/all");
      console.log(response.data);
      setCountries(response.data);
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleShowClick = (countryName) => () => setSearch(countryName);

  const countriesToShow =
    search === ""
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div style={{ display: "grid", gridTemplateColumns:'1fr 1fr', padding: "5% 10%" }}>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <Results countries={countriesToShow} handleShowClick={handleShowClick} />
    </div>
  );
};

export default App;

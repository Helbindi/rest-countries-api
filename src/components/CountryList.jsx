import React from "react";
import Simplified from "./Simplified";

function CountryList({ countries, query, theme, changeSelected }) {
  const queried = queryData(countries);

  function queryData(data) {
    return filterByRegion(filterBySearch(data));
  }

  function filterBySearch(data) {
    return data.filter((country) => {
      if (query.region !== "") {
        const name = country.name.official.toLowerCase();
        const searchTerm = query.search.toLowerCase();
        return name.includes(searchTerm);
      } else {
        return true;
      }
    });
  }

  function filterByRegion(data) {
    return data.filter((country) => {
      if (query.region !== "all") {
        return country.region.toLowerCase() === query.region.toLowerCase();
      } else {
        return true;
      }
    });
  }
  return (
    <>
      {queried.length > 0 ? (
        <div className="countries-grid">
          {queried.map((country) => (
            <Simplified
              theme={theme}
              country={country}
              key={country.ccb3}
              changeSelected={changeSelected}
            />
          ))}
        </div>
      ) : (
        <div className="no-countries">
          <h1>No countries found. Try again!</h1>
        </div>
      )}
    </>
  );
}

export default CountryList;

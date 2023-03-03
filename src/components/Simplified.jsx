import React from "react";

function Simplified({ country }) {
  return (
    <div className="country-simple">
      <div className="country-flag">
        <img src={country.coatOfArms.png} alt={`${country.name.common}-flag`} />
      </div>
      <section className="simple-info">
        <h1>{country.name.official}</h1>
        <p>
          <strong>Population: </strong>
          {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Region: </strong>
          {country.region}
        </p>
        <p>
          <strong>Capital: </strong>
          {country.capital}
        </p>
      </section>
    </div>
  );
}

export default Simplified;

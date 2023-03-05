import React from "react";
import noImg from "../assets/no-image.png";

function Simplified({ country, changeSelected, theme }) {
  const flag = country.flags.png ? (
    <img src={country.flags.png} alt={`${country.name.common}-flag`} />
  ) : (
    <img src={noImg} alt="no-image" />
  );

  function handleSelect(e) {
    e.preventDefault();
    if (country.cca3) {
      changeSelected(country.cca3);
    } else {
      console.error("Country cca3 does not exist");
      changeSelected();
    }
  }
  return (
    <div className={`country-simple ${theme}`} onClick={(e) => handleSelect(e)}>
      <div className="country-flag">{flag}</div>
      <section className="simple-info">
        <h2>{country.name.common}</h2>
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

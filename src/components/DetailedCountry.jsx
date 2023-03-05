import React, { useEffect } from "react";

function DetailedCountry({ country, changeSelected, theme }) {
  // Possible for the country data to be missing data being used.
  // Example: https://restcountries.com/v3.1/name/Antarctica

  const flag = country.flags?.png ? (
    <img src={country.flags?.png} alt={`${country.name.common}-flag`} />
  ) : (
    <img src={noImg} alt="no-image" />
  );

  const currList = country.currencies
    ? Object.values(country.currencies).map((curr, idx) => {
        if (idx == 0) {
          return curr.name;
        } else {
          return ", " + curr.name;
        }
      })
    : "No Data Available";

  const langList = country.languages
    ? Object.values(country.languages).map((name, idx) => {
        if (idx == 0) {
          return name;
        } else {
          return ", " + name;
        }
      })
    : "No Data Available";

  const borders = country.borders ? (
    country.borders?.map((b) => (
      <p className={`border ${theme}`} onClick={(e) => handleChange(e)}>
        {b}
      </p>
    ))
  ) : (
    <p className={`border ${theme}`}>None</p>
  );

  const nativeNames =
    country.name.nativeName && Object.values(country.name.nativeName);
  const native = nativeNames
    ? nativeNames[nativeNames.length - 1].common
    : "No Data Available";

  function handleBack(e) {
    e.preventDefault();
    changeSelected();
  }

  function handleChange(e) {
    e.preventDefault();
    const code = e.target.innerHTML;
    changeSelected(code);
  }

  useEffect(() => {
    document.body.scrollIntoView();
  }, []);
  return (
    <div className="detailed-container">
      <button className={`back-btn ${theme}`} onClick={(e) => handleBack(e)}>
        &larr; Back
      </button>
      <div className="detailed-country">
        {flag}
        <section className="detailed-info">
          <h2>
            {country.name.common ? country.name.common : "No Data Available"}
          </h2>
          <p>
            <strong>Native Name: </strong>
            {native}
          </p>
          <p>
            <strong>Populaton: </strong>
            {country.population
              ? country.population.toLocaleString()
              : "No Data Available"}
          </p>
          <p>
            <strong>Region: </strong>
            {country.region ? country.region : "No Data Available"}
          </p>
          <p>
            <strong>Subregion: </strong>
            {country.subregion ? country.subregion : "No Data Available"}
          </p>
          <p>
            <strong>Capital: </strong>
            {country.capital ? country.capital : "No Data Available"}
          </p>

          <p>
            <strong>Top Level Domain: </strong>
            {country.tld ? country.tld[0] : "No Data Available"}
          </p>
          <p>
            <strong>Currencies: </strong>
            {currList}
          </p>
          <p>
            <strong>Languages: </strong>
            {langList}
          </p>

          <p>
            <strong>Border Countries:</strong>
          </p>
          <div className="border-countries">{borders}</div>
        </section>
      </div>
    </div>
  );
}

export default DetailedCountry;

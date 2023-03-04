import React, { useEffect } from "react";

function DetailedCountry({ country, changeSelected, theme }) {
  const flag = country.flags?.png ? (
    <img src={country.flags?.png} alt={country.flags?.alt} />
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
    : "no data";

  const langList = country.languages
    ? Object.values(country.languages).map((name, idx) => {
        if (idx == 0) {
          return name;
        } else {
          return ", " + name;
        }
      })
    : "no data";

  const borders = country.borders ? (
    country.borders?.map((b) => (
      <p className="border" onClick={(e) => handleChange(e)} theme={theme}>
        {b}
      </p>
    ))
  ) : (
    <p className="border" theme={theme}>
      None
    </p>
  );

  const nativeNames =
    country.name.nativeName && Object.values(country.name.nativeName);
  const native = nativeNames
    ? nativeNames[nativeNames.length - 1].common
    : "no data";

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
      <button className="back-btn" onClick={(e) => handleBack(e)} theme={theme}>
        &larr; Back
      </button>
      <section className="detailed-country">
        {flag}
        <section className="detailed-info">
          <h1>{country.name.common ? country.name.common : "no data"}</h1>
          <p>
            <strong>Native Name: </strong>
            {native}
          </p>
          <p>
            <strong>Populaton: </strong>
            {country.population
              ? country.population.toLocaleString()
              : "no data"}
          </p>
          <p>
            <strong>Region: </strong>
            {country.region ? country.region : "no data"}
          </p>
          <p>
            <strong>Subregion: </strong>
            {country.subregion ? country.subregion : "no data"}
          </p>
          <p>
            <strong>Capital: </strong>
            {country.capital ? country.capital : "no data"}
          </p>

          <p>
            <strong>Top Level Domain: </strong>
            {country.tld ? country.tld[0] : "no data"}
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
      </section>
    </div>
  );
}

export default DetailedCountry;

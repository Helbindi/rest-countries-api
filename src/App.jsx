import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import CountryList from "./components/CountryList";
import DetailedCountry from "./components/DetailedCountry";
import black from "./assets/black-moon.png";
import white from "./assets/white-moon.png";

const baseURL = "https://restcountries.com/v3.1/all";

function App() {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [query, setQuery] = useState({ search: "", region: "all" });
  const [selectedCountry, setSelectedCountry] = useState({});

  // Grab data from API: https://restcountries.com/
  async function fetchAPI(url) {
    const response = await axios.get(url);
    const sorted = response.data.sort((a, b) => {
      const popA = a.population;
      const popB = b.population;
      if (popA > popB) {
        return -1;
      }
      if (popA < popB) {
        return 1;
      }

      return 0;
    });
    setData(sorted);
  }

  function toggleTheme(e) {
    e.preventDefault();
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const value = e.target.value;
    setQuery((prev) => {
      return { ...prev, search: value };
    });
  }

  function handleRegion(e) {
    e.preventDefault();
    const value = e.target.value;
    setQuery((prev) => {
      return { ...prev, region: value };
    });
  }

  function changeSelected(id) {
    if (id) {
      const selected = data.filter((country) => {
        return country.cca3 === id;
      });
      setSelectedCountry(selected[0]);
    } else {
      setSelectedCountry({});
    }
  }

  useEffect(() => {
    fetchAPI(baseURL);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add(`${theme}-mode`);
      document.body.classList.remove(`light-mode`);
    } else {
      document.body.classList.add(`${theme}-mode`);
      document.body.classList.remove(`dark-mode`);
    }
  }, [theme]);

  return (
    <main className="main-container">
      <div className={`nav-header ${theme}`}>
        <h1 className="header-title">Where in the world?</h1>
        <div className="toggle-theme" onClick={toggleTheme}>
          {theme === "dark" ? (
            <>
              <img src={white} alt="light-mode" />
              <p className="theme-name">Light Mode</p>
            </>
          ) : (
            <>
              <img src={black} alt="dark-mode" />
              <p className="theme-name">Dark Mode</p>
            </>
          )}
        </div>
      </div>

      {Object.keys(selectedCountry).length > 0 ? (
        <DetailedCountry
          country={selectedCountry}
          changeSelected={changeSelected}
          theme={theme}
        />
      ) : (
        <>
          {/* Filter Queries */}
          <div className="filter-queries">
            <input
              className={`search-country ${theme}`}
              type="search"
              name="search"
              id="country-search"
              placeholder="Search for a country..."
              value={query.search}
              onChange={(e) => handleSearch(e)}
            />

            <select
              className={`select-region ${theme}`}
              name="regions"
              id="region"
              value={query.region}
              onChange={(e) => handleRegion(e)}
            >
              <option value="all">All</option>
              <option value="africa">Africa</option>
              <option value="americas">Americas</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>

          {/* Display Countries */}
          <CountryList
            countries={data}
            theme={theme}
            query={query}
            changeSelected={changeSelected}
          />
        </>
      )}
    </main>
  );
}

export default App;

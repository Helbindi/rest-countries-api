import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Simplified from "./components/Simplified";

const baseURL = "https://restcountries.com/v3.1/all";

function App() {
  const [data, setData] = useState([]);
  const [isLightMode, setIsLightMode] = useState(true);

  const theme = isLightMode ? "light-mode" : "dark-mode";

  // Grab data from API: https://restcountries.com/
  async function fetchAPI(url) {
    const response = await axios.get(url);
    console.log(response);
    setData(response.data);
  }

  useEffect(() => {
    fetchAPI(baseURL);
  }, []);

  const some = data.slice(0, 9);

  function toggleTheme(e) {
    e.preventDefault();
    if (isLightMode) {
      setIsLightMode(false);
    } else {
      setIsLightMode(true);
    }
  }

  useEffect(() => {
    console.log("isLightMode", isLightMode);
    if (isLightMode) {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    }
  }, [isLightMode]);

  return (
    <main className="main-container">
      <button onClick={toggleTheme}>Toggle</button>
      <div className="countries-grid">
        {some.map((country) => (
          <Simplified country={country} key={country.fifa} />
        ))}
      </div>
    </main>
  );
}

export default App;

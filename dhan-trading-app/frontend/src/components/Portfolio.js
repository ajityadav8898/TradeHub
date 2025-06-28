import React, { useEffect, useState } from "react";
import axios from "axios";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/portfolio")
      .then((response) => setPortfolio(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h2>Portfolio Data</h2>
      <pre>{JSON.stringify(portfolio, null, 2)}</pre>
    </div>
  );
};

export default Portfolio
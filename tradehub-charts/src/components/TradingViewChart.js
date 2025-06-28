import React, { useEffect, useRef, useState } from "react";

const TradingViewChart = () => {
  const containerRef = useRef(null);
  const [symbol, setSymbol] = useState("NASDAQ:AAPL"); // Default stock symbol
  const [theme, setTheme] = useState("light"); // Default theme

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: "tradingview_widget",
        width: "100%",
        height: 500,
        symbol: symbol,
        interval: "D",
        timezone: "Etc/UTC",
        theme: theme,
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
      });
    };

    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Clear previous chart before rendering new one
      containerRef.current.appendChild(script);
    }
  }, [symbol, theme]); // Re-run effect when symbol or theme changes

  return (
    <div className="chart-container">
      <div className="controls">
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g., NASDAQ:AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
      <div ref={containerRef} id="tradingview_widget" className="chart-box"></div>
    </div>
  );
};

export default TradingViewChart;

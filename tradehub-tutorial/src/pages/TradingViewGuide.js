import React, { useEffect } from "react";
import "./TradingViewGuide.css"; // Custom styling

const TradingViewGuide = () => {
  useEffect(() => {
    new window.TradingView.widget({
      "container_id": "tradingview_chart",
      "width": "100%",
      "height": "400px",
      "symbol": "NASDAQ:AAPL",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "details": true
    });
  }, []);

  return (
    <div className="tradingview-guide">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2>TradingView Guide</h2>
        <ul>
          <li><a href="#intro">Introduction</a></li>
          <li><a href="#basics">Chart Basics</a></li>
          <li><a href="#tools">Drawing Tools</a></li>
          <li><a href="#indicators">Indicators & Scripts</a></li>
          <li><a href="#customize">Customizing Charts</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1 id="intro">📌 Introduction</h1>
        <p>TradingView is a powerful charting tool used by traders worldwide...</p>

        <h1 id="basics">📊 Chart Basics</h1>
        <p>Learn how to zoom, pan, and switch between timeframes...</p>

        <h1 id="tools">✏️ Drawing Tools</h1>
        <p>Understand how to use trend lines, Fibonacci retracements...</p>

        <h1 id="indicators">📈 Indicators & Scripts</h1>
        <p>Explore technical indicators like RSI, MACD, and Bollinger Bands...</p>

        <h1 id="customize">🎨 Customizing Charts</h1>
        <p>Modify chart colors, grid styles, and more...</p>

        {/* Embedded TradingView Chart */}
        <div id="tradingview_chart"></div>
      </div>
    </div>
  );
};

export default TradingViewGuide;

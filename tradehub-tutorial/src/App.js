import React from "react";
import { Element } from "react-scroll";
import Navbar from "./components/Navbar"; // Navbar Component
import TradingViewWidget from "./components/TradingViewWidget"; // TradingView Component
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 20px;
  width: 100%;
  overflow-y: auto; /* Ensures content is scrollable */
`;

const Section = styled(motion.div)`
  background: white;
  padding: 40px;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Gilroy", sans-serif;
`;

// App Component
const App = () => {
  return (
    <PageContainer>
      <Navbar /> {/* Navbar at the top */}
      <Content>
        {/* Introduction Section */}
        <Element name="intro">
          <Section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2>1️⃣ Introduction</h2>
            <p>🔹 TradingView is a tool that helps traders analyze stock, crypto, and forex charts.</p>
            <p>🔹 You can see price movements, trends, and indicators to make better trading decisions.</p>
            <p>🔹 It’s free to use, but paid plans give extra features.</p>
          </Section>
        </Element>

        {/* Chart Basics Section */}
        <Element name="chartBasics">
          <Section initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
            <h2>📊 Chart Basics</h2>
            <p>🔹 Candlestick Charts – Show price movement in a specific time frame.</p>
            <p>🔹 Line Charts – Connect closing prices for a smooth trend view.</p>
            <p>🔹 Bar Charts – Display the opening, closing, high, and low price for each time period.</p>
            <p>🔹 Volume Indicators – Show the number of trades happening.</p>
            <p>📝 Key Point: Candlesticks are the most used charts in trading!</p>
          </Section>
        </Element>

        {/* Drawing Tools Section */}
        <Element name="drawingTools">
          <Section initial={{ x: 100 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
            <h2>✏ Drawing Tools</h2>
            <p>🔹 Trend Lines – Draw lines to identify market direction.</p>
            <p>🔹 Fibonacci Retracements – Predict price reversals using percentage levels.</p>
            <p>🔹 Gann Fans – Help measure time and price movements.</p>
            <p>🔹 Elliott Waves – Identify repeating market wave patterns.</p>
            <p>📝 Key Point: Drawing tools help in understanding market trends.</p>
          </Section>
        </Element>

        {/* Indicators & Scripts Section */}
        <Element name="indicators">
          <Section initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
            <h2>📈 Indicators & Scripts</h2>
            <p>🔹 RSI – Shows if a stock is overbought (too high) or oversold (too low).</p>
            <p>🔹 MACD – Helps spot trend changes.</p>
            <p>🔹 Bollinger Bands – Show whether a stock is too volatile or stable.</p>
            <p>📝 Key Point: Indicators help traders make smarter decisions!</p>
          </Section>
        </Element>

        {/* Customizing Charts Section */}
        <Element name="customizingCharts">
          <Section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
            <h2>🎨 Customizing Charts</h2>
            <p>Modify chart colors, grid styles, and more to match your trading strategy.</p>
            
            {/* TradingView Widget - Now inside a separate component */}
            <TradingViewWidget />
          </Section>
        </Element>
      </Content>
    </PageContainer>
  );
};

export default App;

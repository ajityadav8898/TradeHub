import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

// Themes
const lightTheme = {
  background: "#F5F5DC", // Cream White
  textColor: "#222",
  boxColor: "#fff",
  borderColor: "#444",
  buttonBg: "#4CAF50",
  buttonText: "#fff",
};

const darkTheme = {
  background: "#1E1E1E",
  textColor: "#fff",
  boxColor: "#252525",
  borderColor: "#777",
  buttonBg: "#FF9800",
  buttonText: "#222",
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textColor};
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
  }
`;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${(props) => props.theme.textColor};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const ChartBox = styled.div`
  width: 85%;
  max-width: 1100px;
  height: 400px;
  margin: 20px auto 0 auto;  /* Added top margin */
  border: 3px solid ${(props) => props.theme.borderColor};
  border-radius: 12px;
  padding: 15px;
  background: ${(props) => props.theme.boxColor};
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
`;


const Button = styled.button`
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonText};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.07);
    opacity: 0.9;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const [stockSymbol] = useState("AAPL");

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  useEffect(() => {
    if (!window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => initializeChart();
      document.body.appendChild(script);
    } else {
      initializeChart();
    }
  }, [stockSymbol, theme]);

  const initializeChart = () => {
    new window.TradingView.widget({
      container_id: "tradingview_chart",
      symbol: stockSymbol,
      width: "100%",
      height: "350",
      theme: theme === lightTheme ? "light" : "dark",
      style: "1",
      locale: "en",
      toolbar_bg: theme === lightTheme ? "#f1f3f6" : "#1E1E1E",
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      enable_publishing: false,
      allow_symbol_change: true,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Heading>📈 Real-Time Trading Chart</Heading>
        <Button onClick={toggleTheme}>Switch Theme</Button>
        <ChartBox>
          <div id="tradingview_chart"></div>
        </ChartBox>
      </Container>
    </ThemeProvider>
  );
}

export default App;

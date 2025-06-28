import React from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #2c2c54;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h2>TradingView Guide</h2>
      <ul>
        <li><Link to="intro" smooth={true} duration={500}>Introduction</Link></li>
        <li><Link to="chartBasics" smooth={true} duration={500}>Chart Basics</Link></li>
        <li><Link to="drawingTools" smooth={true} duration={500}>Drawing Tools</Link></li>
        <li><Link to="indicators" smooth={true} duration={500}>Indicators & Scripts</Link></li>
        <li><Link to="customizingCharts" smooth={true} duration={500}>Customizing Charts</Link></li>
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;

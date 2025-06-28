import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LiveChart from "./LiveChart";

function App() {
    return (
        <Router>
            <div>
                {/* Routes */}
                <Routes>
                    <Route path="/" element={<h1>Welcome to TradeHub</h1>} />
                    <Route path="/live-chart" element={<LiveChart />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

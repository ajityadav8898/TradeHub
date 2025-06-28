import React, { useEffect, useRef } from "react";

const LiveChart = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!window.TradingView) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/tv.js";
            script.async = true;
            script.onload = createWidget;
            document.body.appendChild(script);
        } else {
            createWidget();
        }
    }, []);

    const createWidget = () => {
        if (containerRef.current && window.TradingView) {
            new window.TradingView.widget({
                "container_id": containerRef.current.id,
                "width": "100%",
                "height": "600px",
                "symbol": "NSE:NIFTY50", // Default Indian stock
                "interval": "D",
                "timezone": "Asia/Kolkata",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "hide_legend": false,
                "save_image": false,
                "hide_side_toolbar": false, // Enables stock search
                "withdateranges": true,
                "allow_symbol_change": true, // Enables searching other stocks
            });
        }
    };

    return (
        <div>
            <h2>Live Stock Market Chart</h2>
            <div ref={containerRef} id="tradingview-chart"></div>
        </div>
    );
};

export default LiveChart;

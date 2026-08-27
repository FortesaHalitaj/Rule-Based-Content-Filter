import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import RuleManager from "./components/RuleManager";

function App() {
    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className="app">
            <Navbar
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <main className="main-content">
                {activePage === "dashboard" && (
                    <Dashboard
                        setActivePage={setActivePage}
                    />
                )}

                {activePage === "rules" && (
                    <RuleManager />
                )}

            </main>
        </div>
    );
}

export default App;
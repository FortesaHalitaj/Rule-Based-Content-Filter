import React, { useEffect, useState, useRef } from "react";
import { getHealth, getRules } from "../api";
import FilterTester from "./FilterTester";

function Dashboard({ setActivePage }) {
    const [health, setHealth] = useState(null);
    const [rules, setRules] = useState([]);
    
    // Create a reference for the tester section
    const testerRef = useRef(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const healthData = await getHealth();
            const rulesData = await getRules();

            setHealth(healthData);

            if (Array.isArray(rulesData)) {
                setRules(rulesData);
            } else {
                setRules(
                    rulesData.rules ||
                    rulesData.data ||
                    []
                );
            }
        } catch (error) {
            console.error("Dashboard error:", error);
        }
    };

    const scrollToTester = () => {
        testerRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const enabledRules = rules.filter(
        (rule) => Number(rule.enabled) === 1
    );

    const blockedRules = rules.filter(
        (rule) => rule.action_type === "block"
    );

    const highlightRules = rules.filter(
        (rule) => rule.action_type === "highlight"
    );

    return (
        <div>
            <section className="hero">
                <div>
                    <p className="eyebrow">
                        RULE-BASED CONTENT FILTERING
                    </p>

                    <h2>
                        Control content with
                        <span> intelligent rules.</span>
                    </h2>

                    <p className="hero-description">
                        Create configurable rules, evaluate content,
                        and visualize filtering decisions in real time.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="primary-button"
                            onClick={scrollToTester}
                        >
                            Test Content
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => setActivePage("rules")}
                        >
                            Manage Rules
                        </button>
                    </div>
                </div>

                <div className="hero-card">
                    <div className="status-dot"></div>

                    <p>System Status</p>

                    <h3>
                        {health?.status === "OK"
                            ? "Operational"
                            : "Checking..."}
                    </h3>

                    <span>
                        {health?.database === "Connected"
                            ? "Database connected"
                            : "Database unavailable"}
                    </span>
                </div>
            </section>

            <section className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Total Rules</div>
                    <div className="stat-value">{rules.length}</div>
                    <div className="stat-description">Configured filtering rules</div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Active Rules</div>
                    <div className="stat-value">{enabledRules.length}</div>
                    <div className="stat-description">Currently enabled</div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Highlight Rules</div>
                    <div className="stat-value">{highlightRules.length}</div>
                    <div className="stat-description">Visual content rules</div>
                </div>

                <div className="stat-card">
                    <div className="stat-label">Block Rules</div>
                    <div className="stat-value">{blockedRules.length}</div>
                    <div className="stat-description">Content blocking rules</div>
                </div>
            </section>

            <section 
                ref={testerRef} 
                className="dashboard-tester-section" 
                style={{ marginTop: "40px" }}
            >
                <FilterTester />
            </section>
        </div>
    );
}

export default Dashboard;
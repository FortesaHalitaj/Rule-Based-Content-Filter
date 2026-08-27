import React from "react";

function Navbar({ activePage, setActivePage }) {
    return (
        <header className="navbar">
            <div className="navbar-inner">

                <div
                    className="brand"
                    onClick={() => setActivePage("dashboard")}
                >
                    <div className="brand-icon">
                        RF
                    </div>

                    <div>
                        <h1>RuleFilter</h1>
                        <span>Content Filtering System</span>
                    </div>
                </div>

                <nav className="nav-links">

                    <button
                        className={
                            activePage === "dashboard"
                                ? "nav-link active"
                                : "nav-link"
                        }
                        onClick={() => setActivePage("dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        className={
                            activePage === "rules"
                                ? "nav-link active"
                                : "nav-link"
                        }
                        onClick={() => setActivePage("rules")}
                    >
                        Rules
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
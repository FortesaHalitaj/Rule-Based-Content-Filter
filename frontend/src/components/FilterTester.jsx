import React, { useState } from "react";
import { filterContent } from "../api";
import ResultsPanel from "./ResultsPanel";

function FilterTester() {
    const [content, setContent] = useState(
        "This is an urgent meeting about the deadline."
    );

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            setError("Please enter some content to analyze.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await filterContent(content);

            setResult(response);

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to connect to the filtering engine."
            );

            setResult(null);

        } finally {
            setLoading(false);
        }
    };

    const clearTest = () => {
        setContent("");
        setResult(null);
        setError("");
    };

    return (
        <div>

            <div className="page-header">

                <div>
                    <p className="eyebrow">
                        FILTERING ENGINE
                    </p>

                    <h2>Test Content</h2>

                    <p>
                        Submit text to evaluate it against the
                        active filtering rules.
                    </p>
                </div>

            </div>


            <div className="tester-layout">

                <section className="tester-card">

                    <div className="card-heading">

                        <div>
                            <h3>Content Input</h3>

                            <p>
                                Enter text that you want the
                                filtering engine to analyze.
                            </p>
                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <textarea
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            placeholder="Enter content to analyze..."
                            rows="12"
                        />


                        <div className="textarea-footer">

                            <span>
                                {content.length} characters
                            </span>

                            <div>

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={clearTest}
                                >
                                    Clear
                                </button>

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Analyzing..."
                                        : "Analyze Content"}
                                </button>

                            </div>

                        </div>

                    </form>


                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                </section>


                <section className="tester-info">

                    <div className="info-card">

                        <div className="info-icon">
                            01
                        </div>

                        <div>
                            <h4>Rules are loaded</h4>
                            <p>
                                Active rules are retrieved from
                                the database.
                            </p>
                        </div>

                    </div>


                    <div className="info-card">

                        <div className="info-icon">
                            02
                        </div>

                        <div>
                            <h4>Content is evaluated</h4>
                            <p>
                                The filtering engine checks
                                each rule against the content.
                            </p>
                        </div>

                    </div>


                    <div className="info-card">

                        <div className="info-icon">
                            03
                        </div>

                        <div>
                            <h4>Actions are returned</h4>
                            <p>
                                Matching rules determine the
                                resulting content actions.
                            </p>
                        </div>

                    </div>

                </section>

            </div>


            {result && (
                <ResultsPanel
                    result={result}
                />
            )}

        </div>
    );
}

export default FilterTester;
import React from "react";

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedContent({ content, rules }) {
    if (!content) {
        return null;
    }

    if (!rules || rules.length === 0) {
        return <span>{content}</span>;
    }

    const highlightRules = rules.filter(
        (rule) =>
            rule.action_type === "highlight"
    );

    if (highlightRules.length === 0) {
        return <span>{content}</span>;
    }

    const keywords = highlightRules
        .map((rule) => rule.keyword)
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);

    if (keywords.length === 0) {
        return <span>{content}</span>;
    }

    const regex = new RegExp(
        `(${keywords.map(escapeRegExp).join("|")})`,
        "gi"
    );

    const parts = content.split(regex);

    return (
        <span>
            {parts.map((part, index) => {

                const matchedRule = highlightRules.find(
                    (rule) =>
                        rule.keyword.toLowerCase() ===
                        part.toLowerCase()
                );

                if (!matchedRule) {
                    return (
                        <span key={index}>
                            {part}
                        </span>
                    );
                }

                return (
                    <mark
                        key={index}
                        className="highlighted-word"
                        style={{
                            backgroundColor:
                                matchedRule.action_value ||
                                "#ffeb3b",
                        }}
                        title={`Rule: ${matchedRule.keyword}`}
                    >
                        {part}
                    </mark>
                );
            })}
        </span>
    );
}


function ResultsPanel({ result }) {

    const matchedRules =
        result.matched_rules || [];

    const blocked =
        result.blocked === true;


    return (
        <section className="results-section">

            <div className="results-header">

                <div>
                    <p className="eyebrow">
                        ANALYSIS RESULT
                    </p>

                    <h3>
                        Filtering Results
                    </h3>
                </div>

                <div
                    className={
                        blocked
                            ? "result-status blocked"
                            : "result-status passed"
                    }
                >
                    <span></span>

                    {blocked
                        ? "Content Blocked"
                        : "Content Allowed"}
                </div>

            </div>


            <div className="result-stats">

                <div>
                    <span>Rules Matched</span>
                    <strong>
                        {result.match_count ||
                            matchedRules.length}
                    </strong>
                </div>

                <div>
                    <span>Rules Evaluated</span>
                    <strong>
                        —
                    </strong>
                </div>

                <div>
                    <span>Decision</span>
                    <strong>
                        {blocked
                            ? "BLOCK"
                            : "ALLOW"}
                    </strong>
                </div>

            </div>


            <div className="content-preview">

                <div className="preview-header">
                    <h4>Processed Content</h4>
                </div>

                <div className="preview-content">

                    <HighlightedContent
                        content={result.original_content}
                        rules={matchedRules}
                    />

                </div>

            </div>


            <div className="matched-rules">

                <div className="preview-header">

                    <div>
                        <h4>Matched Rules</h4>

                        <span>
                            {matchedRules.length} matching rule
                            {matchedRules.length !== 1
                                ? "s"
                                : ""}
                        </span>
                    </div>

                </div>


                {matchedRules.length === 0 ? (

                    <div className="no-matches">
                        <div className="no-match-icon">
                            ✓
                        </div>

                        <div>
                            <strong>
                                No rules matched
                            </strong>

                            <p>
                                The content passed without
                                triggering any filtering rules.
                            </p>
                        </div>
                    </div>

                ) : (

                    <div className="matched-list">

                        {matchedRules.map((rule) => (

                            <div
                                className="matched-rule"
                                key={rule.rule_id}
                            >

                                <div className="matched-keyword">
                                    {rule.keyword}
                                </div>

                                <div className="matched-details">

                                    <span className="badge">
                                        {rule.match_type}
                                    </span>

                                    <span
                                        className={`action-badge ${rule.action_type}`}
                                    >
                                        {rule.action_type}
                                    </span>

                                    <span className="priority-label">
                                        Priority {rule.priority}
                                    </span>

                                </div>

                                {rule.action_value && (
                                    <div className="matched-value">
                                        {rule.action_type === "highlight" && (
                                            <span
                                                className="color-preview"
                                                style={{
                                                    backgroundColor:
                                                        rule.action_value,
                                                }}
                                            ></span>
                                        )}

                                        {rule.action_value}
                                    </div>
                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}

export default ResultsPanel;
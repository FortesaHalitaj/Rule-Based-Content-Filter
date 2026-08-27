import React, { useEffect, useState } from "react";

const defaultForm = {
    keyword: "",
    match_type: "contains",
    action_type: "highlight",
    action_value: "#ff0000",
    enabled: 1,
    priority: 10,
};

function RuleForm({ rule, onSubmit, onCancel }) {
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (rule) {
            setForm({
                keyword: rule.keyword || "",
                match_type: rule.match_type || "contains",
                action_type: rule.action_type || "highlight",
                action_value: rule.action_value || "",
                enabled: Number(rule.enabled) === 1 ? 1 : 0,
                priority: rule.priority || 10,
            });
        } else {
            setForm(defaultForm);
        }
    }, [rule]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                        ? 1
                        : 0
                    : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.keyword.trim()) {
            alert("Keyword is required.");
            return;
        }

        onSubmit({
            ...form,
            keyword: form.keyword.trim(),
            priority: Number(form.priority),
        });
    };

    return (
        <div className="form-card">

            <div className="form-header">

                <div>
                    <p className="eyebrow">
                        {rule ? "EDIT RULE" : "NEW RULE"}
                    </p>

                    <h3>
                        {rule
                            ? "Update filtering rule"
                            : "Create filtering rule"}
                    </h3>
                </div>

                <button
                    className="close-button"
                    onClick={onCancel}
                >
                    ×
                </button>

            </div>


            <form onSubmit={handleSubmit}>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Keyword</label>

                        <input
                            type="text"
                            name="keyword"
                            value={form.keyword}
                            onChange={handleChange}
                            placeholder="e.g. urgent"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Match Type</label>

                        <select
                            name="match_type"
                            value={form.match_type}
                            onChange={handleChange}
                        >
                            <option value="contains">
                                Contains
                            </option>

                            <option value="exact">
                                Exact
                            </option>

                            <option value="starts_with">
                                Starts With
                            </option>

                            <option value="ends_with">
                                Ends With
                            </option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label>Action Type</label>

                        <select
                            name="action_type"
                            value={form.action_type}
                            onChange={handleChange}
                        >
                            <option value="highlight">
                                Highlight
                            </option>

                            <option value="tooltip">
                                Tooltip
                            </option>

                            <option value="block">
                                Block
                            </option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label>Action Value</label>

                        <input
                            type="text"
                            name="action_value"
                            value={form.action_value}
                            onChange={handleChange}
                            placeholder={
                                form.action_type === "highlight"
                                    ? "#ff0000"
                                    : "IMPORTANT"
                            }
                        />

                        <small>
                            Color for highlight or message for tooltip.
                        </small>
                    </div>


                    <div className="form-group">
                        <label>Priority</label>

                        <input
                            type="number"
                            name="priority"
                            min="1"
                            max="100"
                            value={form.priority}
                            onChange={handleChange}
                        />

                        <small>
                            Higher priority rules are evaluated first.
                        </small>
                    </div>


                    <div className="form-group checkbox-group">

                        <label className="checkbox-label">

                            <input
                                type="checkbox"
                                name="enabled"
                                checked={Number(form.enabled) === 1}
                                onChange={handleChange}
                            />

                            <span>
                                Rule is active
                            </span>

                        </label>

                    </div>

                </div>


                <div className="form-actions">

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        {rule
                            ? "Save Changes"
                            : "Create Rule"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default RuleForm;
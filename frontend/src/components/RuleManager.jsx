import React, { useEffect, useState } from "react";

import {
    getRules,
    createRule,
    updateRule,
    deleteRule,
} from "../api";

import RuleForm from "./RuleForm";

function RuleManager() {
    const [rules, setRules] = useState([]);
    const [editingRule, setEditingRule] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRules();
    }, []);

    const loadRules = async () => {
        try {
            setLoading(true);

            const response = await getRules();

            const data = Array.isArray(response)
                ? response
                : response.rules || response.data || [];

            setRules(data);
            setError("");

        } catch (err) {
            console.error(err);
            setError("Unable to load rules.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (rule) => {
        try {
            await createRule(rule);

            await loadRules();

            setShowForm(false);

        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to create rule."
            );
        }
    };

    const handleUpdate = async (rule) => {
        try {
            await updateRule(editingRule.id, rule);

            await loadRules();

            setEditingRule(null);
            setShowForm(false);

        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to update rule."
            );
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this rule?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteRule(id);
            await loadRules();

        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to delete rule."
            );
        }
    };

    const openCreate = () => {
        setEditingRule(null);
        setShowForm(true);
    };

    const openEdit = (rule) => {
        setEditingRule(rule);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingRule(null);
    };

    return (
        <div>

            <div className="page-header">

                <div>
                    <p className="eyebrow">
                        CONFIGURATION
                    </p>

                    <h2>Filtering Rules</h2>

                    <p>
                        Create and manage the rules used by
                        the content filtering engine.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={openCreate}
                >
                    + Add Rule
                </button>

            </div>


            {showForm && (
                <RuleForm
                    rule={editingRule}
                    onSubmit={
                        editingRule
                            ? handleUpdate
                            : handleCreate
                    }
                    onCancel={closeForm}
                />
            )}


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            <div className="table-container">

                <div className="table-header">
                    <div>
                        <h3>All Rules</h3>
                        <span>
                            {rules.length} rule
                            {rules.length !== 1 ? "s" : ""}
                        </span>
                    </div>
                </div>


                {loading ? (
                    <div className="empty-state">
                        Loading rules...
                    </div>
                ) : rules.length === 0 ? (
                    <div className="empty-state">
                        <h3>No rules yet</h3>
                        <p>
                            Create your first filtering rule.
                        </p>
                    </div>
                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>
                                <tr>
                                    <th>Keyword</th>
                                    <th>Match Type</th>
                                    <th>Action</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {rules.map((rule) => (

                                    <tr key={rule.id}>

                                        <td>
                                            <strong>
                                                {rule.keyword}
                                            </strong>
                                        </td>

                                        <td>
                                            <span className="badge">
                                                {rule.match_type}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="action-cell">

                                                <span
                                                    className={`action-dot ${rule.action_type}`}
                                                ></span>

                                                <div>
                                                    <strong>
                                                        {rule.action_type}
                                                    </strong>

                                                    {rule.action_value && (
                                                        <small>
                                                            {rule.action_value}
                                                        </small>
                                                    )}
                                                </div>

                                            </div>
                                        </td>

                                        <td>
                                            <span className="priority">
                                                {rule.priority}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    Number(rule.enabled) === 1
                                                        ? "status enabled"
                                                        : "status disabled"
                                                }
                                            >
                                                {Number(rule.enabled) === 1
                                                    ? "Active"
                                                    : "Disabled"}
                                            </span>
                                        </td>

                                        <td>

                                            <div className="row-actions">

                                                <button
                                                    className="small-button"
                                                    onClick={() =>
                                                        openEdit(rule)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="small-button danger"
                                                    onClick={() =>
                                                        handleDelete(rule.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default RuleManager;
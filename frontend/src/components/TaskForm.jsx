import React, { useState } from "react";

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("Please enter a task title.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await onTaskCreated({
                title: title.trim(),
                description: description.trim(),
                priority,
            });

            setTitle("");
            setDescription("");
            setPriority("medium");
        } catch (err) {
            setError(err.message || "Failed to create task.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <div>
                    <p className="eyebrow">CREATE TASK</p>
                    <h2>Add a new task</h2>
                </div>

                <div className="form-icon">+</div>
            </div>

            <div className="form-group">
                <label htmlFor="title">Task title</label>

                <input
                    id="title"
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>

                <textarea
                    id="description"
                    placeholder="Add some details about this task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="priority">Priority</label>

                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    disabled={loading}
                >
                    <option value="low">Low priority</option>
                    <option value="medium">Medium priority</option>
                    <option value="high">High priority</option>
                </select>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button
                className="primary-button"
                type="submit"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="button-spinner"></span>
                        Creating...
                    </>
                ) : (
                    <>
                        <span>+</span>
                        Create task
                    </>
                )}
            </button>
        </form>
    );
}

export default TaskForm;
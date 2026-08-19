import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
    const isCompleted = task.status === "completed";

    return (
        <article className={`task-card ${isCompleted ? "completed" : ""}`}>
            <button
                className={`check-button ${isCompleted ? "checked" : ""}`}
                onClick={() => onToggle(task)}
                aria-label={
                    isCompleted
                        ? "Mark task as pending"
                        : "Mark task as completed"
                }
            >
                {isCompleted ? "✓" : ""}
            </button>

            <div className="task-content">
                <div className="task-top">
                    <h3>{task.title}</h3>

                    <span className={`priority ${task.priority}`}>
                        {task.priority}
                    </span>
                </div>

                {task.description && (
                    <p className="task-description">
                        {task.description}
                    </p>
                )}

                <div className="task-meta">
                    <span>
                        {isCompleted ? "Completed" : "In progress"}
                    </span>

                    {task.created_at && (
                        <span>
                            {new Date(task.created_at).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                        </span>
                    )}
                </div>
            </div>

            <button
                className="delete-button"
                onClick={() => onDelete(task.id)}
                aria-label="Delete task"
                title="Delete task"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4h6v2" />
                </svg>
            </button>
        </article>
    );
}

export default TaskItem;
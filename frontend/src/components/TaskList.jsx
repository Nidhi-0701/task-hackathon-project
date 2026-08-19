import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, filter }) {
    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") {
            return task.status !== "completed";
        }

        if (filter === "completed") {
            return task.status === "completed";
        }

        return true;
    });

    if (filteredTasks.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">✓</div>

                <h3>
                    {filter === "completed"
                        ? "No completed tasks"
                        : filter === "active"
                            ? "No active tasks"
                            : "No tasks yet"}
                </h3>

                <p>
                    {filter === "all"
                        ? "Create your first task to get started."
                        : "You're all caught up!"}
                </p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {filteredTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;
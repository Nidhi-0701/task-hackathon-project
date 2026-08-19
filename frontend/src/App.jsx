import React, { useEffect, useMemo, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "./services/taskService";

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getTasks();

            setTasks(response.data || []);
        } catch (err) {
            console.error(err);
            setError(
                "Unable to connect to the backend. Make sure the server is running on port 5000."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleCreateTask = async (task) => {
        const response = await createTask(task);

        if (response.data) {
            setTasks((currentTasks) => [
                response.data,
                ...currentTasks,
            ]);
        }
    };

    const handleToggleTask = async (task) => {
        try {
            const newStatus =
                task.status === "completed"
                    ? "pending"
                    : "completed";

            const response = await updateTask(task.id, {
                status: newStatus,
            });

            if (response.data) {
                setTasks((currentTasks) =>
                    currentTasks.map((item) =>
                        item.id === task.id
                            ? response.data
                            : item
                    )
                );
            }
        } catch (err) {
            console.error(err);
            setError("Unable to update the task.");
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);

            setTasks((currentTasks) =>
                currentTasks.filter((task) => task.id !== id)
            );
        } catch (err) {
            console.error(err);
            setError("Unable to delete the task.");
        }
    };

    const statistics = useMemo(() => {
        const completed = tasks.filter(
            (task) => task.status === "completed"
        ).length;

        const active = tasks.length - completed;

        const highPriority = tasks.filter(
            (task) =>
                task.priority === "high" &&
                task.status !== "completed"
        ).length;

        return {
            total: tasks.length,
            active,
            completed,
            highPriority,
        };
    }, [tasks]);

    return (
        <div className="app-shell">
            <header className="topbar">
                <div className="brand">
                    <div className="brand-mark">✓</div>

                    <div>
                        <span className="brand-name">TaskFlow</span>
                        <span className="brand-subtitle">
                            Personal task manager
                        </span>
                    </div>
                </div>

                <div className="connection-status">
                    <span className="status-dot"></span>
                    API connected
                </div>
            </header>

            <main className="main-container">
                <section className="hero">
                    <div>
                        <p className="eyebrow">YOUR WORKSPACE</p>

                        <h1>
                            Get things done.
                            <br />
                            <span>One task at a time.</span>
                        </h1>

                        <p className="hero-description">
                            Organize your work, prioritize what matters,
                            and keep moving forward.
                        </p>
                    </div>

                    <div className="hero-date">
                        <span>Today</span>
                        <strong>
                            {new Date().toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                            })}
                        </strong>
                    </div>
                </section>

                <section className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-label">TOTAL TASKS</span>
                        <strong>{statistics.total}</strong>
                        <span className="stat-description">
                            All your tasks
                        </span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">IN PROGRESS</span>
                        <strong>{statistics.active}</strong>
                        <span className="stat-description">
                            Still to do
                        </span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">COMPLETED</span>
                        <strong>{statistics.completed}</strong>
                        <span className="stat-description">
                            Tasks finished
                        </span>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">HIGH PRIORITY</span>
                        <strong>{statistics.highPriority}</strong>
                        <span className="stat-description">
                            Need attention
                        </span>
                    </div>
                </section>

                <div className="content-grid">
                    <aside>
                        <TaskForm onTaskCreated={handleCreateTask} />
                    </aside>

                    <section className="tasks-section">
                        <div className="section-header">
                            <div>
                                <p className="eyebrow">TASKS</p>
                                <h2>Your tasks</h2>
                            </div>

                            <div className="filter-tabs">
                                <button
                                    className={
                                        filter === "all"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setFilter("all")
                                    }
                                >
                                    All
                                </button>

                                <button
                                    className={
                                        filter === "active"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setFilter("active")
                                    }
                                >
                                    Active
                                </button>

                                <button
                                    className={
                                        filter === "completed"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setFilter("completed")
                                    }
                                >
                                    Completed
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="error-banner">
                                <span>!</span>
                                {error}

                                <button onClick={loadTasks}>
                                    Retry
                                </button>
                            </div>
                        )}

                        {loading ? (
                            <div className="loading-state">
                                <div className="large-spinner"></div>
                                <p>Loading your tasks...</p>
                            </div>
                        ) : (
                            <TaskList
                                tasks={tasks}
                                onToggle={handleToggleTask}
                                onDelete={handleDeleteTask}
                                filter={filter}
                            />
                        )}
                    </section>
                </div>
            </main>

            <footer>
                <span>TaskFlow</span>
                <span>Built with React + Express + PostgreSQL</span>
            </footer>
        </div>
    );
}

export default App;
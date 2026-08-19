const pool = require("../config/db");

// GET all tasks
const getTasks = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY created_at DESC"
        );

        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks"
        });
    }
};


// GET one task
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error fetching task:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch task"
        });
    }
};


// CREATE task
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO tasks
            (title, description, priority)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [
                title,
                description || null,
                priority || "medium"
            ]
        );

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error creating task:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create task"
        });
    }
};


// UPDATE task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            status,
            priority
        } = req.body;

        const result = await pool.query(
            `UPDATE tasks
             SET
                title = COALESCE($1, title),
                description = COALESCE($2, description),
                status = COALESCE($3, status),
                priority = COALESCE($4, priority)
             WHERE id = $5
             RETURNING *`,
            [
                title,
                description,
                status,
                priority,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error updating task:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update task"
        });
    }
};


// DELETE task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting task:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete task"
        });
    }
};


module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
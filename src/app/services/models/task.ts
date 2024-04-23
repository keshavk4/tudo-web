import mongoose, { Schema } from "mongoose";

/**
 * Represents the schema for a task in the database.
 */
const taskSchema = new Schema(
    {
        user_id: String,
        task: String,
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.models.user_tasks || mongoose.model('user_tasks', taskSchema);

export default Task;
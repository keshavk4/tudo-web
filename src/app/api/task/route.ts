import { NextResponse } from "next/server";

import Credential from "@/app/services/models/task";
import connectMongoDB from "@/app/services/utils/mongodb";

/**
 * Handles the HTTP POST request for creating a new task.
 * @param req - The request object containing the user_id and task data.
 * @returns A JSON response indicating the success of the operation.
 */
async function POST(req: Request) {
    const { user_id, task } = await req.json();
    await connectMongoDB();
    await Credential.create({ user_id, task });
    return NextResponse.json({ message: "Task added" }, { status: 201 });
}

/**
 * Handles the GET request for retrieving tasks based on user ID.
 * @param req - The request object containing the URL and query parameters.
 * @returns A JSON response containing the tasks matching the user ID.
 */
async function GET(req: Request) {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const user_id = params.get("user_id");
    const task = params.get("task");
    await connectMongoDB();
    const tasks = await Credential.find({ user_id: user_id });
    return NextResponse.json({ tasks });
}

/**
 * Updates a task in the database.
 * @param req - The request object containing the task data.
 * @returns A JSON response containing the updated task.
 */
async function PUT(req: Request) {
    const { _id, task } = await req.json();
    await connectMongoDB();
    const tasks = await Credential.findByIdAndUpdate(_id, { task: task });
    return NextResponse.json({ tasks });
}

/**
 * Deletes a task from the database.
 * @param req - The request object.
 * @returns A JSON response indicating the success of the deletion.
 */
async function DELETE(req: Request) {
    const { _id } = await req.json();
    await connectMongoDB();
    await Credential.deleteOne({ _id });
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
}

export { POST, GET, PUT, DELETE };
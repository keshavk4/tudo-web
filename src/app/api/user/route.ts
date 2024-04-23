import { NextResponse } from "next/server";

import Credential from "@/app/services/models/user";
import connectMongoDB from "@/app/services/utils/mongodb";

/**
 * Handles the POST request to create a new user.
 * @param req - The request object containing the user data.
 * @returns A JSON response indicating the success or failure of the user creation.
 */
async function POST(req: Request) {
    const { user_id, password } = await req.json();
    await connectMongoDB();
    const user = await Credential.findOne({ user_id: user_id });
    if (user != null) return NextResponse.json({ message: "User already" }, { status: 401 });
    await Credential.create({ user_id, password });
    return NextResponse.json({ message: "User Created" }, { status: 201 });
}

/**
 * Handles the GET request for user data.
 * @param req - The request object.
 * @returns A JSON response indicating the status of the request.
 */
async function GET(req: Request) {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const user_id = params.get("user_id");
    const password = params.get("password");
    await connectMongoDB();
    const user = await Credential.findOne({ user_id: user_id, password: password });
    return NextResponse.json({ status: user != null ? 200 : 401 });
}

export { POST, GET };
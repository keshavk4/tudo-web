"use client";

import crypto from "crypto";
import Link from "next/link";
import { useState } from "react";

type UserCredentialTypes = {
    email: string;
    password: string;
}

export default function SignUpPage() {
    const [message, setMessage] = useState<string>();
    const [userCredential, setUserCredential] = useState<UserCredentialTypes>(
        { email: "", password: "" }
    );

    /**
     * Handles the input change event for the signup page.
     * Updates the user credentials state with the new input value.
     * @param event - The input change event.
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredential((prev: UserCredentialTypes) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    /**
     * Handles the sign-up form submission.
     * @param e - The form event.
     */
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const hashPwd = crypto.createHash("sha256").update(userCredential.password).digest("hex");
        const res = await fetch(`/api/user`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "user_id": userCredential.email,
                "password": hashPwd
            }),
        })
        res.status == 201 ? setMessage("Account created successfully") : setMessage("Account already exists");
    };

    return (
        <section className="w-max mx-auto mt-[10%]">
            <span className="block w-max mx-auto font-bold">Sign Up</span><br />
            <form onSubmit={handleSignUp}>
                <label htmlFor="email" className="text-gray-500">
                    Email ID
                </label><br />
                <input type="email" name="email" id="email" className="h-[2rem] w-[20rem] border-2 border-gray-300 rounded-md" onChange={handleInputChange} />
                <br /><br />
                <label htmlFor="password" className="text-gray-500">
                    Password
                </label><br />
                <input type="password" name="password" id="password" className="h-[2rem] w-[20rem] border-2 border-gray-300 rounded-md" onChange={handleInputChange} />
                <br />
                <span className="block w-max mx-auto text-red-900 font-semibold">{message}</span>
                <br />
                <button type="submit" className="px-8 py-2 rounded-full bg-blue-600 text-white">Sign Up</button><br />
                <span className="block mt-2">
                    Already have an account? <Link href={"/"} className="text-blue-800 hover:text-indigo-800">Sign In</Link>
                </span>
            </form>
        </section>
    );
}
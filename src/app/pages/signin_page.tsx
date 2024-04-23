"use client";

import crypto from "crypto";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ListPage from "@/app/pages/listpage";
import LogoutIcon from "/public/assets/icons/logout-icon.svg";

type UserCredentialTypes = {
    email: string;
    password: string;
}

export default function SignInPage() {
    const [message, setMessage] = useState<string>();
    const [loggedInUser, setLoggedInUser] = useState<string>();
    const [userCredential, setUserCredential] = useState<UserCredentialTypes>(
        { email: "", password: "" }
    );

    /**
     * Handles the input change event for the sign-in form.
     * Updates the user credentials state with the new input values.
     * @param event - The input change event.
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredential((prev: UserCredentialTypes) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    /**
     * Handles the login functionality.
     * @param e - The form event.
     */
    const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const hashPwd = crypto.createHash("sha256").update(userCredential.password).digest("hex");
        const res = await fetch(`/api/user?user_id=${userCredential.email}&password=${hashPwd}`);
        const data = await res.json();

        if (data.status === 200) {
            setMessage(undefined);
            setLoggedInUser(userCredential.email);
        } else setMessage("Invalid credentials");
    };

    return (
        <>
            {
                loggedInUser === undefined ? (
                    <section className="w-max mx-auto mt-[10%]">
                        <span className="block w-max mx-auto font-bold">Login</span><br />
                        <form onSubmit={handleLogIn}>
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
                            <button type="submit" className="px-8 py-2 rounded-full bg-blue-600 text-white">Login</button><br />
                            <span className="block mt-2">
                                Don&apos;t have an account? <Link href="/signup" className="text-blue-800 hover:text-indigo-800">Sign up</Link>
                            </span>
                        </form>
                    </section>
                ) : (<><section className="flex py-2 px-4 bg-black text-white text-xl">User: {loggedInUser} <button className="flex ml-auto text-white text-xl" onClick={() => {
                    setLoggedInUser(undefined);
                }}>Logout &nbsp;<Image src={LogoutIcon} alt="logout icon" /></button></section> <ListPage user_id={loggedInUser} /></>)
            }
        </>
    );
}
'use client';

import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import Upload from "./upload";

export default function Navbar() {
    // Init user state
    const [user, setUser] = useState<User | null>(null);

    /**
     * As the component mounts, it executes the function, unsubscribe.
     * The function execute and the function onAuthStateChanged sets up a listener for authentication state changes.
     * At first, the callback function does not execute since the auth state isn't changed.
     * When auth state changes, it calls the callback function to change the user state.
     * As the component unmounts, the authentication state change listener is cleaned up to prevent potential memory leaks and unnecessary updates.
     */
    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [] /* No dependencies, never rerun */);

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={90} height={20}
                    src="/youtube-logo.svg" alt="YouTube Logo"/>
            </Link>
            {
                user && <Upload />
            }
            <SignIn user={user} />
        </nav>
    );
}
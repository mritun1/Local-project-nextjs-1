"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
const LoginBlockDiv = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/auth/me/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: 1
                })
            })
            if (res.ok) {
                const data = await res.json();
                if (data.code === 0) {
                    setShow(true);
                }
            }
        }
        load();
        return () => { }
    }, [])
    return (
        <>
            {show ? (
                <div className="loginBlock">
                    <div className="bgOpacity"></div>
                    <div className="loginRegisterDiv">
                        <h2>Login to get full access.</h2>
                        <Link href="/">
                            <button><i className="fa-solid fa-right-to-bracket"></i> Login/Register</button>
                        </Link>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default LoginBlockDiv
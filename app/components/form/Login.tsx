"use client"
import React, { useState } from 'react'
import Alerts from '../temp/Alerts'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter();

    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [logstatus, setLogstatus] = useState(true)
    const [msg, setMsg] = useState('')
    const [submitLoad, setSubmitLoad] = useState(true)

    const loginForm = async (e: any) => {
        e.preventDefault()
        setSubmitLoad(false)
        const res = await fetch("api/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mobile,
                password
            })
        })
        if (!res.ok) {
            console.log("something error while fetching")
        } else {
            const data = await res.json()
            setMsg(data.msg)
            if (data.code === 0) {
                setLogstatus(false)
            } else if (data.code === 1) {
                setLogstatus(true)
                router.push("app/local-offers")
            }
            setSubmitLoad(true)
        }
    }
    return (
        <>
            {logstatus ? (
                <Alerts
                    alert='success'
                    msg={`${msg}`}
                ></Alerts>
            ) : (
                <Alerts
                    alert='danger'
                    msg={`${msg}`}
                ></Alerts>
            )}


            <form id="loginForm" onSubmit={loginForm} method='POST' >
                <div className="login">
                    <div className="input">
                        <input type="number" name='mobile' placeholder="Mobile number"
                            onChange={(e) => { setMobile(e.target.value) }}
                            value={mobile}
                            required />
                    </div>
                    <div className="input">
                        <input type="password" name='password' placeholder="Password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            required />
                    </div>


                    {submitLoad ?
                        (
                            <div className="btn">
                                <button type="submit">
                                    <i className="fa-solid fa-right-to-bracket"></i> Login
                                </button>
                            </div>
                        ) : (
                            <div className="btn_loading">
                                <p>
                                    <Image src="/icons/others/loading.webp" alt="Loading img" width={20} height={20} />
                                    Loading...
                                </p>
                            </div>
                        )
                    }


                    <div className="forgot">
                        <p>
                            <a href="">Forgot Password?</a>
                        </p>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login
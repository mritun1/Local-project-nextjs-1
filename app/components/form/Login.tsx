"use client"
import React, { useState } from 'react'
import Alerts from '../temp/Alerts'

const Login = () => {
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
            }
            setSubmitLoad(true)
        }
    }
    return (
        <>
            {logstatus ? ('') : (
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
                                    <img src="/icons/others/loading.webp" alt="Loading img" />
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
"use client"
import React, { useState } from 'react'
import Alerts from '../temp/Alerts'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Alerts2 from '../temp/Alerts2'

const Login = () => {
    const router = useRouter();

    const [mobile, setMobile] = useState<string>('')
    const [mobile2, setMobile2] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [logstatus, setLogstatus] = useState<boolean>(true)
    const [msg, setMsg] = useState<string>('')
    const [submitLoad, setSubmitLoad] = useState<boolean>(true)
    const [isHiddenModal, setIsHiddenModal] = useState<boolean>(true)
    const [status, setStatus] = useState<string>('')
    const [alert, setAlert] = useState<boolean>(false)
    const [msg2,setMsg2] = useState<string>('')
    const [showForgotForm,setShowForgotForm] = useState<boolean>(true)

    const forgotPass = () => {
        setIsHiddenModal(!isHiddenModal)
    }

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
            setMsg("something error while fetching")
        } else {
            setSubmitLoad(true)
            const data = await res.json()
            setMsg(data.msg)
            if (data.code === 0) {
                setLogstatus(false)
            } else if (data.code === 1) {
                setLogstatus(true)
                router.push("app/local-offers")
            }
        }
        
    }

    const forgotSubmit = async (e: any) => {
        e.preventDefault()
        const res2 = await fetch("api/auth/forgotpass", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile: mobile2,
            })
        })
        if (!res2.ok) {
            setMsg2("something error while fetching")
            setAlert(true)
        } else {
            setAlert(true)
            const data2 = await res2.json()
            setMsg2(data2.msg)
            if (data2.code === 1){
                setStatus('success')
                setShowForgotForm(false)
            }else{
                setStatus('danger')
            }
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
                            <span onClick={forgotPass}>Forgot Password?</span>
                        </p>
                    </div>
                </div>
            </form>

            {/* 
                ---------------------------------------
                FORGOT PASSWORD - START
                --------------------------------------- 
            */}
            <div id="forgot_password" className="modal"
                style={{ display: isHiddenModal ? `none` : `block` }}
            >
                <div className="modal_bg"></div>
                <div className="modal_body">
                    <div className="sign_up">
                        <div className="modal_head">
                            <div >
                                <h2>Forgot Password?</h2>
                                <p>Find your forgot password again.</p>
                            </div>
                            <div>
                                <div><button
                                    onClick={forgotPass}
                                ><i className="fa-solid fa-xmark"></i></button></div>
                            </div>
                        </div>


                        <Alerts2
                            display={alert}
                            alert={status}
                            msg={`${msg2}`}
                        ></Alerts2>

                        {showForgotForm?(
                            <div className="sign_up_form">
                                <form id="forgot_form"
                                    onSubmit={forgotSubmit}
                                    method="POST">

                                    <div className="sign_up_title terms">
                                        <p>Please Enter your Mobile Number.</p>
                                    </div>

                                    <div className="sign_up_one_col">
                                        <div><input type="number" name="mobile" placeholder="Mobile Number"
                                            onChange={(e) => { setMobile2(e.target.value) }}
                                            value={mobile2}
                                            required /></div>
                                    </div>

                                    <div className="sign_up_title terms">
                                        <p>Mobile phone should be alone with you.</p>
                                    </div>

                                    {submitLoad ?
                                        (
                                            <div className="sign_up_title submit">
                                                <button type="submit">Activate Account</button>
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

                                </form>
                            </div>
                        ):('')}
                        

                    </div>
                </div>
            </div >
        </>
    )
}

export default Login
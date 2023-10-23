"use client"
import React, { useEffect, useState } from 'react'
import Alerts from '../temp/Alerts'

const SignUpModal = () => {

    const [isHidden, setIsHidden] = useState(true)
    const [isHiddenActivation, setIsHiddenActivation] = useState(false)
    const displayModal = () => {
        setIsHidden(!isHidden)
    }
    const displayModalActivation = () => {
        setIsHiddenActivation(!isHiddenActivation)
    }

    // REGISTER FORM START
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [pinCode, setPinCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const [profession, setProfession] = useState('')
    const [code, setCode] = useState(false)
    const [activeStatus, setActiveStatus] = useState(false)
    const [msg, setMsg] = useState('')
    const [submitLoad, setSubmitLoad] = useState(true)

    const signupForm = async (e: any) => {
        e.preventDefault();
        setSubmitLoad(false)
        const res = await fetch("api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                mobile,
                pinCode,
                password,
                confirmPassword,
                gender,
                profession
            })
        })

        if (!res.ok) {
            // Handle the error here, e.g., show an error message
            console.log('something error while fetching')
        } else {
            const data = await res.json();
            if (data.code === 1) {
                setActiveStatus(true)
            } else {
                setCode(true)
            }
            setMsg(data.msg)
            setSubmitLoad(true)
        }
    }

    return (
        <>
            <button onClick={displayModal}><i className="fa-solid fa-id-badge"></i> Register</button>


            {/* 
                -------------------------
                 MODAL FOR ACTIVATE ACCOUNT 
                 -------------------------
            */}
            {activeStatus ? (
                <div id="activate_account" className="modal" style={{ display: isHiddenActivation ? `none` : `block` }}>
                    <div className="modal_bg"></div>
                    <div className="modal_body">
                        <div className="sign_up">
                            <div className="modal_head">
                                <div >
                                    <h2>Activate Account</h2>
                                    <p>You must activate the account before login.</p>
                                </div>
                                <div>
                                    <div><button onClick={displayModalActivation} ><i className="fa-solid fa-xmark"></i></button></div>
                                </div>
                            </div>

                            <div className="sign_up_form">
                                <form id="sign_up_form" method="POST">

                                    <div className="sign_up_title terms">
                                        <p>OTP is sent to your mobile number, please find and enter below.</p>
                                    </div>

                                    <div className="sign_up_one_col">
                                        <div><input type="number" name="otp" placeholder="OTP" required /></div>
                                    </div>

                                    <div className="sign_up_title terms">
                                        <p>After enter the OTP please click here.</p>
                                    </div>
                                    <div className="sign_up_title submit">
                                        <button type="submit">Activate Account</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div >

            ) : (

                <div id="sign_up" className="modal" style={{ display: isHidden ? `none` : `block` }}>
                    <div className="modal_bg"></div>
                    <div className="modal_body">
                        <div className="sign_up">
                            <div className="modal_head">
                                <div>
                                    <h2>Sign Up</h2>
                                    <p>It`s fast and easy.</p>
                                </div>
                                <div>
                                    <div><button onClick={displayModal} ><i className="fa-solid fa-xmark"></i></button></div>
                                </div>
                            </div>
                            {/* 
                            ---------------------------------------
                            ERROR - START
                            --------------------------------------- 
                        */}
                            {code ?
                                (<Alerts
                                    alert='danger'
                                    msg={`${msg}`}
                                ></Alerts>)
                                : ('')
                            }

                            {/* 
                            ---------------------------------------
                            ERROR - END
                            --------------------------------------- 
                        */}
                            <div className="sign_up_form">
                                <form onSubmit={signupForm} >

                                    <div className="sign_up_two_col">
                                        <div>
                                            <div><input type="text" name="first_name" placeholder="First Name" required
                                                onChange={(e) => setFirstName(e.target.value)}
                                                value={firstName}
                                            /></div>
                                        </div>
                                        <div>
                                            <div><input type="text" name="last_name" placeholder="Last Name"
                                                onChange={(e) => setLastName(e.target.value)}
                                                value={lastName}
                                                required /></div>
                                        </div>
                                    </div>
                                    <div className="sign_up_one_col">
                                        <div><input type="number" name="mobile" placeholder="Mobile Number"
                                            onChange={(e) => setMobile(e.target.value)}
                                            value={mobile}
                                            required /></div>
                                    </div>
                                    <div className="sign_up_one_col">
                                        <div><input type="password" name="password" placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required /></div>
                                    </div>
                                    <div className="sign_up_one_col">
                                        <div><input type="password" name="password_confirm" placeholder="Confirm Password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            value={confirmPassword}
                                            required /></div>
                                    </div>
                                    <div className="sign_up_title">
                                        <p>Gender</p>
                                    </div>
                                    <div className="sign_up_three_col">
                                        <div>
                                            <div>
                                                <div><div><label htmlFor="male">Male</label></div></div>
                                                <div><div><input type="radio" name="gender" id="male"
                                                    onChange={(e) => setGender(e.target.value)}
                                                    value="Male"
                                                /></div></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div><div><label htmlFor="female">Female</label></div></div>
                                                <div><div><input type="radio" name="gender"
                                                    onChange={(e) => setGender(e.target.value)}
                                                    value="Female"
                                                    id="female" /></div></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div><div><label htmlFor="others">Others</label></div></div>
                                                <div><div><input type="radio" name="gender"
                                                    onChange={(e) => setGender(e.target.value)}
                                                    value="Others"
                                                    id="others" /></div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sign_up_two_col">
                                        <div>
                                            <p className="text-color">PIN Code</p>
                                            <div><input type="number" name="pin" maxLength={6} placeholder="ie.783360"
                                                onChange={(e) => setPinCode(e.target.value)}
                                                value={pinCode}
                                                required /></div>
                                        </div>
                                        <div>
                                            <p className="text-color">Profession</p>
                                            <div><input type="text" name="profession" placeholder="ie. Student, Engineer"
                                                onChange={(e) => setProfession(e.target.value)}
                                                value={profession}
                                                required /></div>
                                        </div>
                                    </div>
                                    <div className="sign_up_title terms">
                                        <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                                    </div>

                                    {submitLoad ?
                                        (
                                            <div className="sign_up_title submit">
                                                <button type="submit">Sign up</button>
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

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default SignUpModal
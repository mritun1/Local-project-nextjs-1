"use client"
import React, { useState } from 'react'

const SignUpModal = () => {

    const [isHidden, setIsHidden] = useState(true)
    const [isHiddenActivation, setIsHiddenActivation] = useState(false)
    const displayModal = () => {
        setIsHidden(!isHidden)
    }
    const displayModalActivation = () => {
        setIsHiddenActivation(!isHiddenActivation)
    }

    return (
        <>
            <button onClick={displayModal}><i className="fa-solid fa-id-badge"></i> Register</button>

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

                        <div className="sign_up_form">
                            <form id="sign_up_form" method="POST">

                                <div className="sign_up_two_col">
                                    <div>
                                        <div><input type="text" name="first_name" placeholder="First Name" required /></div>
                                    </div>
                                    <div>
                                        <div><input type="text" name="last_name" placeholder="Last Name" required /></div>
                                    </div>
                                </div>
                                <div className="sign_up_one_col">
                                    <div><input type="email" name="email" placeholder="Email" required /></div>
                                </div>
                                <div className="sign_up_one_col">
                                    <div><input type="password" name="password" placeholder="Password" required /></div>
                                </div>
                                <div className="sign_up_one_col">
                                    <div><input type="password" name="password_confirm" placeholder="Confirm Password" required /></div>
                                </div>
                                <div className="sign_up_title">
                                    <p>Gender</p>
                                </div>
                                <div className="sign_up_three_col">
                                    <div>
                                        <div>
                                            <div><div><label htmlFor="male">Male</label></div></div>
                                            <div><div><input type="radio" name="gender" id="male" /></div></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div><div><label htmlFor="female">Female</label></div></div>
                                            <div><div><input type="radio" name="gender" id="female" /></div></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div><div><label htmlFor="others">Others</label></div></div>
                                            <div><div><input type="radio" name="gender" id="others" /></div></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sign_up_two_col">
                                    <div>
                                        <p className="text-color">PIN Code</p>
                                        <div><input type="number" name="pin" maxLength={6} placeholder="ie.783360" required /></div>
                                    </div>
                                    <div>
                                        <p className="text-color">Profession</p>
                                        <div><input type="text" name="profession" placeholder="ie. Student, Engineer" required /></div>
                                    </div>
                                </div>
                                <div className="sign_up_title terms">
                                    <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                                </div>
                                <div className="sign_up_title submit">
                                    <button onClick={displayModalActivation} type="submit">Sign up</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            {/* 
                -------------------------
                 MODAL FOR ACTIVATE ACCOUNT 
                 -------------------------
            */}
            <div className="modal" style={{ display: isHiddenActivation ? `none` : `block` }}>
                <div className="modal_bg"></div>
                <div className="modal_body">
                    <div className="sign_up">
                        <div className="modal_head">
                            <div>
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
            </div>
        </>
    )
}

export default SignUpModal
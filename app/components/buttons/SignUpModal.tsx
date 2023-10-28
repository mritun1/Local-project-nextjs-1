"use client"
import React, { useState } from 'react'
import ActivateForm from '../form/ActivateForm'
import Image from 'next/image'
import Alerts3 from '../temp/Alerts3'

const SignUpModal = () => {

    const [isHidden, setIsHidden] = useState(true)
    const displayModal = () => {
        setIsHidden(!isHidden)
    }

    // REGISTER FORM START
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [pinCode, setPinCode] = useState<number>()
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [mobile, setMobile] = useState<number>()
    const [gender, setGender] = useState<string>('')
    const [profession, setProfession] = useState<string>('')
    const [code, setCode] = useState<boolean>(false)
    const [activeStatus, setActiveStatus] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    const [submitLoad, setSubmitLoad] = useState<boolean>(true)
    const [user_id, setUserId] = useState<number>(0)

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
                setUserId(data.mobile)
            } else {
                setCode(true)
            }
            setMsg(data.msg)
            setSubmitLoad(true)
        }
    }

    const setCodeFunc = () =>{
        setCode(!code)
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
                <ActivateForm
                    isHidden={false}
                    mobileNumber={user_id}
                ></ActivateForm>

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
                                    <div className='close'><button onClick={displayModal} ><i className="fa-solid fa-xmark"></i></button></div>
                                </div>
                            </div>
                            {/*
                            ---------------------------------------
                            ERROR - START
                            ---------------------------------------
                        */}
                                <Alerts3
                                    alert='danger'
                                    msg={`${msg}`}
                                    isHidden={code}
                                    onClick={setCodeFunc}
                                ></Alerts3>

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
                                                value={firstName || ""}
                                            /></div>
                                        </div>
                                        <div>
                                            <div><input type="text" name="last_name" placeholder="Last Name"
                                                onChange={(e) => setLastName(e.target.value)}
                                                    value={lastName || ""}
                                                required /></div>
                                        </div>
                                    </div>
                                    <div className="sign_up_one_col">
                                        <div><input type="number" name="mobile" placeholder="Mobile Number"
                                            onChange={(e) => setMobile(parseInt(e.target.value))}
                                                value={mobile || ""}
                                            required /></div>
                                    </div>
                                    <div className="sign_up_one_col">
                                        <div><input type="password" name="password" placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                                value={password || ""}
                                            required /></div>
                                    </div>
                                    <div className="sign_up_one_col">
                                        <div><input type="password" name="password_confirm" placeholder="Confirm Password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                value={confirmPassword || ""}
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
                                                onChange={(e) => setPinCode(parseInt(e.target.value))}
                                                    value={pinCode || ""}
                                                required /></div>
                                        </div>
                                        <div>
                                            <p className="text-color">Profession</p>
                                            <div><input type="text" name="profession" placeholder="ie. Student, Engineer"
                                                onChange={(e) => setProfession(e.target.value)}
                                                    value={profession || ""}
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
                                                    <Image src="/icons/others/loading.webp" alt="Loading img" width={20} height={20} />
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
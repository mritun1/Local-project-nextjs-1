"use client"
import React, { useEffect, useState } from 'react'
import Alerts from '../temp/Alerts'
import Image from 'next/image'

type propType = {
    mobileNumber:Number
}

const ActivateForm = (props:propType) => {
    const [isHiddenActivation, setIsHiddenActivation] = useState<boolean>(false)
    const displayModalActivation = () => {
        setIsHiddenActivation(!isHiddenActivation)
    }

    const [isHiddenSuccessModal, setIsHiddenSuccessModal] = useState<boolean>(false)
    const displaySuccessModal = () =>{
        setIsHiddenSuccessModal(!isHiddenSuccessModal)
    }

    const [otp, setOtp] = useState<string>('')
    const [mobile, setMobile] = useState<number>(0)
    const [status, setStatus] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    const [submitLoad, setSubmitLoad] = useState<boolean>(true)
    const [res, setRes] = useState<boolean>(false)

    useEffect(()=>{
        setMobile(Number(props.mobileNumber))
    },[props.mobileNumber])

    const activateForm = async (e: any) => {
        e.preventDefault();
        setSubmitLoad(false)
        const res = await fetch(
            "api/auth/activate-ac",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mobile: mobile,
                    otp,
                })
            },
        )
        if(!res.ok){
            console.log("Something wrong Fetching")
        }else{
            const data = await res.json();
            if (data.code === 1) {
                setStatus(false)
                setRes(true)
            }
            setMsg(data.msg)
            setSubmitLoad(true)
            setStatus(true)
        }
    }
    return (
        <>
            {res?(
                <div id="activate_success" className="modal" style={{ display: isHiddenSuccessModal ? `none` : `block` }} >
                    <div className="modal_bg"></div>
                    <div className="modal_body">
                        <div className="sign_up">
                            <div className="modal_head">
                                <div >
                                    <h2>Activate Success</h2>
                                    <p>Welcome to Localnii.com</p>
                                </div>
                                <div>
                                    <div><button onClick={displaySuccessModal} ><i className="fa-solid fa-xmark"></i></button></div>
                                </div>
                            </div>

                            <div className="sign_up_form">

                                <form>

                                    <div className="sign_up_title terms" >
                                        <center><p>Your account is activated success.</p></center>
                                    </div>

                                    <div className="warn_board">
                                        <center>
                                            <Image
                                                src={`/icons/others/success.png`}
                                                alt='success image'
                                                width={100}
                                                height={100}
                                                onClick={displaySuccessModal}
                                            />
                                        </center>
                                    </div>

                                    <div className="sign_up_title terms" >
                                        <center><p>Please Login.</p></center>
                                    </div>

                                </form>


                            </div>

                        </div>
                    </div>
                </div >
            ):(
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

                            {status ?
                                (<Alerts
                                    alert='danger'
                                    msg={`${msg}`}
                                ></Alerts>)
                                : ('')
                            }

                            <div className="sign_up_form">
                                <form id="sign_up_form" onSubmit={activateForm} method="POST">

                                    <div className="sign_up_title terms">
                                        <p>OTP is sent to your mobile number, please find and enter below.</p>
                                    </div>

                                    

                                    <div className="sign_up_one_col">
                                        <div><input type="text" name="otp" placeholder="OTP"
                                            onChange={(e) => { setOtp(e.target.value) }}
                                            value={otp}
                                            required /></div>
                                    </div>

                                    <div className="sign_up_title terms">
                                        <p>After enter the OTP please click here.</p>
                                    </div>

                                    {/* {submitLoad ?
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
                                    } */}

                                        <div className="sign_up_title submit">
                                            <button type="submit">Activate Account</button>
                                        </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div >
            )}
            
        </>
    )
}

export default ActivateForm
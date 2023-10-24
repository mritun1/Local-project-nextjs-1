"use client"
import React, { useEffect, useState } from 'react'
import Alerts from '../temp/Alerts'
type propType = {
    id:string
}

const ActivateForm = (props:propType) => {
    const [isHiddenActivation, setIsHiddenActivation] = useState(false)
    const displayModalActivation = () => {
        setIsHiddenActivation(!isHiddenActivation)
    }

    const [otp, setOtp] = useState('')
    const [_id, setId] = useState('')
    const [status, setStatus] = useState(false)
    const [msg,setMsg] = useState('')
    const [submitLoad, setSubmitLoad] = useState(true)

    useEffect(()=>{
        setId(props.id)
    },[props.id])

    const activateForm = async (e: any) => {
        e.preventDefault();
        setSubmitLoad(false)
        const res = await fetch(
            "api/auth/activate-ac",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id, 
                    otp
                })
            },
        )
        if(!res.ok){
            console.log("Something wrong Fetching")
        }else{
            const data = await res.json();
            if (data.code === 1) {
                setStatus(false)
            }
            setMsg(data.msg)
            setSubmitLoad(true)
            setStatus(true)
        }
    }
    return (
        <>
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
                                    <div><input type="number" name="otp" placeholder="OTP"
                                        onChange={(e) => { setOtp(e.target.value) }}
                                        value={otp}
                                        required /></div>
                                </div>

                                <div className="sign_up_title terms">
                                    <p>After enter the OTP please click here.</p>
                                </div>

                                {submitLoad ?
                                    (
                                        <div className="sign_up_title submit">
                                            <button type="submit">Activate Account</button>
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
            </div >
        </>
    )
}

export default ActivateForm
"use client"
import React, { useState } from 'react'
import Modal from '../../temp/Modal'
import ButtonLoading from '../../temp/ButtonLoading'
import Alerts3 from '../../temp/Alerts3'

const ChangePassword = () => {
    const [modalHidden,setModalHidden] = useState<boolean>(false)
    const showModal = () => {
        setModalHidden(!modalHidden)
    }

    const [oldPass, setOldPass] = useState<string>("")
    const [newPass,setNewPass] = useState<string>("")
    const [confirmPass, setConfirmPass] = useState<string>("")
    const [msg, setMsg] = useState<string>("")
    const [submitBtn, setSubmitBtn] = useState<boolean>(true)
    const [alert, setAlert] = useState<boolean>(false)
    const [alertClass,setAlertClass] = useState<string>("danger")

    const closeAlert = () =>{
        setAlert(!alert)
    }

    const submitHandler = async (e:any) =>{
        e.preventDefault()
        setSubmitBtn(false)
        const res = await fetch("/api/settings/change-password",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                oldPass,
                newPass,
                confirmPass
            })
        })
        if(res.ok){
            const data = await res.json()
            console.log(data)
            if(data.code === 1){
                setAlertClass("success")
            }else{
                setAlertClass("danger")
            }
            setSubmitBtn(true)
            setAlert(true)
            setMsg(data.msg)
        }else{
            setSubmitBtn(true)
            setMsg("Error: Something went wrong")
            setAlert(true)
        }
    }
    return (
        <>
            <div className="bar_btn_box">
                <div>
                    <div><i className="fa-solid fa-gears"></i></div>
                </div>
                <div>
                    <div><h3>Change Password</h3></div>
                </div>
                <div>
                    <div><button onClick={showModal}><i className="fa-solid fa-right-long"></i></button></div>
                </div>
            </div>

            <Modal
                id="changePasswordModal"
                title="Change Password"
                isHidden={modalHidden}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={showModal}
            >

                <Alerts3
                    alert={alertClass}
                    msg={`${msg}`}
                    isHidden={alert}
                    onClick={closeAlert}
                ></Alerts3>

                <div className="sign_up_form">
                    <form onSubmit={submitHandler}>

                        <div className="sign_up_one_col">
                            <div><input type={'password'} name={'oldPassword'} placeholder={'Old Password'}
                                onChange={(e) => setOldPass(e.target.value)}
                                value={oldPass}
                                required /></div>
                        </div>

                        <p className='text-color'>Enter your new password</p>

                        <div className="sign_up_one_col">
                            <div><input type={'password'} name={'newPassword'} placeholder={'New Password'}
                                onChange={(e) => setNewPass(e.target.value)}
                                value={newPass}
                                required /></div>
                        </div>

                        <div className="sign_up_one_col">
                            <div><input type={'password'} name={'confirmPassword'} placeholder={'Confirm Password'}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                value={confirmPass}
                                required /></div>
                        </div>


                        <ButtonLoading
                            submitLoad={submitBtn}
                        >
                            <div className="btn-box right">
                                <div>
                                    <button className='save'><i className="fa-solid fa-floppy-disk"></i> Save</button>
                                </div>
                            </div>
                        </ButtonLoading>

                    </form>
                </div>
            </Modal>

        </>
    )
}

export default ChangePassword
"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import Modal from '../../temp/Modal'
import ButtonLoading from '../../temp/ButtonLoading'
type propsType = {
    id: string,
    children: string,
    title: string,
    inputName1: string,
    placeHolder1: string,
    inputType1: string,
    inputVal1:string,
    inputName2: string,
    placeHolder2: string,
    inputType2: string,
    inputVal2:string,
    isModalHidden: boolean,
    modalClass: string,
    additionalBtn: ReactNode,
    onClick: () => void
}

const DoubleInput = (props: propsType) => {
    const [val1, setVal1] = useState<any>(props.inputVal1)
    const [val2, setVal2] = useState<any>(props.inputVal2)
    const [submitLoad, setSubmitLoad] = useState<boolean>(true)

    useEffect(()=>{
        setVal1(props.inputVal1)
        setVal2(props.inputVal2)
    },[props.inputVal1,props.inputVal2])

    const submitHandler = async (e: any) => {
        e.preventDefault()
        setSubmitLoad(!submitLoad)
        const res = await fetch("/api/auth/me/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                [props.inputName1]: val1,
                [props.inputName2]: val2,
            })
        })
        if (res.ok) {
            const data = await res.json()
            if (data.code === 1) {
                props.onClick()
                setVal1(data.response[props.inputName1])
                setVal2(data.response[props.inputName2])
            }
            setSubmitLoad(true)
        }
    }
    return (
        <>
            <div className="singleData">
                <div>
                    <p>{props.title}</p>
                </div>
                <div>
                    <div>
                        <div><h3>{val1 + ' ' + val2}</h3></div>
                    </div>
                    <div>
                        <div><button onClick={props.onClick}><i className="fa-solid fa-pen-to-square"></i> Edit</button></div>
                    </div>
                </div>
            </div>

            <Modal
                id={props.id}
                title={props.title}
                isHidden={props.isModalHidden}
                zIndex={1}
                modalClass={''}
                additionBtn={props.additionalBtn}
                closeBtn={props.onClick}
            >
                <div className="sign_up_form">
                    <form onSubmit={submitHandler} >

                        <div className="sign_up_two_col">
                            <div>
                                <div><input  type={props.inputType1} name={props.inputName1} placeholder={props.placeHolder1} required
                                    value={val1}
                                    onChange={(e) => setVal1(e.target.value)}
                                /></div>
                            </div>
                            <div>
                                <div><input  type={props.inputType2} name={props.inputName2} placeholder={props.placeHolder2}
                                    value={val2}
                                    onChange={(e) => setVal2(e.target.value)}
                                    required /></div>
                            </div>
                        </div>

                        <ButtonLoading 
                        submitLoad={submitLoad}
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

export default DoubleInput
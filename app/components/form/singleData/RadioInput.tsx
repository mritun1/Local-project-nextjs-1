"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import Modal from '../../temp/Modal'
import ButtonLoading from '../../temp/ButtonLoading'
type propsType = {
    id: string,
    children: string,
    title: string,
    inputName: string,
    inputType: string,
    isModalHidden: boolean,
    modalClass: string,
    additionalBtn: ReactNode,
    onClick: () => void
}

const RadioInput = (props: propsType) => {
    const options = ['Male','Female','Others']
    const [val, setVal] = useState<string>(props.children)
    const [submitLoad, setSubmitLoad] = useState<boolean>(true)

    useEffect(()=>{
        setVal(props.children)
    },[props.children])

    const submitHandler = async (e: any) => {
        e.preventDefault()
        setSubmitLoad(!submitLoad)
        const res = await fetch("/api/auth/me/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                [props.inputName]: val
            })
        })
        if (res.ok) {
            setSubmitLoad(true)
            const data = await res.json()
            if (data.code === 1) {
                props.onClick()
                setVal(data.response[props.inputName])
            }

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
                        <div><h3>{val}</h3></div>
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
                    <form onSubmit={submitHandler}>

                        <div className="sign_up_three_col">

                            {options.map((option,index)=>(
                                <div key={index}>
                                    <div>
                                        <div><div><label htmlFor={option}>{option}</label></div></div>
                                        <div><div><input type="radio" name="gender" id={option}
                                        checked={option === val}
                                        onChange={(e)=>setVal(option)}
                                        /></div></div>
                                    </div>
                                </div>
                            ))}

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

export default RadioInput
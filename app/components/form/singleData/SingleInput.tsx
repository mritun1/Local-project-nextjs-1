"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import Modal from '../../temp/Modal'
import ButtonLoading from '../../temp/ButtonLoading'
type propsType = {
    id: string,
    children: any,
    title: string,
    inputName: string,
    inputType: string,
    isModalHidden: boolean,
    modalClass: string,
    additionalBtn: ReactNode,
    onClick: () => void,
}

const SingleInput = (props: propsType) => {
    const [val, setVal] = useState<any>(props.children)
    const [submitLoad, setSubmitLoad] = useState<boolean>(true)

    useEffect(()=>{
        setVal(props.children)
    }, [props.children])

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
                        <div className="sign_up_one_col">
                            <div><input type={props.inputType} name={props.inputName} placeholder={props.title}
                                onChange={(e) => setVal(e.target.value)}
                                value={val}
                                required /></div>
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

export default SingleInput
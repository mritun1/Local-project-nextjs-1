"use client"
import React, { ReactNode } from 'react'
import Modal from '../../temp/Modal'
type propsType = {
    id: string,
    children: string,
    title: string,
    inputName1: string,
    placeHolder1: string,
    inputType1: string,
    inputVal1:any,
    inputName2: string,
    placeHolder2: string,
    inputType2: string,
    inputVal2:any,
    isModalHidden: boolean,
    modalClass: string,
    additionalBtn: ReactNode,
    onClick: () => void
}

const SingleText = (props: propsType) => {
    return (
        <>
            <div className="singleData">
                <div>
                    <p>{props.title}</p>
                </div>
                <div>
                    <div>
                        <div><h3>{props.children}</h3></div>
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
                    <form >

                        <div className="sign_up_two_col">
                            <div>
                                <div><input  type={props.inputType1} name={props.inputName1} placeholder={props.placeHolder1} required
                                    value={props.inputVal1}
                                /></div>
                            </div>
                            <div>
                                <div><input  type={props.inputType2} name={props.inputName2} placeholder={props.placeHolder2}
                                    value={props.inputVal2}
                                    required /></div>
                            </div>
                        </div>

                        <div className="btn-box right">
                            <div>
                                <button className='save'><i className="fa-solid fa-floppy-disk"></i> Save</button>
                            </div>
                        </div>

                    </form>
                </div>
            </Modal>

        </>
    )
}

export default SingleText
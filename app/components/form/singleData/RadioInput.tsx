"use client"
import React, { ReactNode } from 'react'
import Modal from '../../temp/Modal'
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

                        <div className="sign_up_three_col">
                            <div>
                                <div>
                                    <div><div><label htmlFor="male">Male</label></div></div>
                                    <div><div><input type="radio" name="gender" id="male"
                                       
                                    /></div></div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div><div><label htmlFor="female">Female</label></div></div>
                                    <div><div><input type="radio" name="gender"
                                        
                                        id="female" /></div></div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div><div><label htmlFor="others">Others</label></div></div>
                                    <div><div><input type="radio" name="gender"
                                        
                                        id="others" /></div></div>
                                </div>
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

export default RadioInput
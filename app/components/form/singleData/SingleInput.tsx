"use client"
import React, { ReactNode} from 'react'
import Modal from '../../temp/Modal'
type propsType = {
    id:string,
    children: any,
    title: string,
    inputName: string,
    inputType: string,
    isModalHidden: boolean,
    modalClass: string,
    additionalBtn: ReactNode,
    onClick : ()=>void
}

const SingleInput = (props: propsType) => {
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
                        <div className="sign_up_one_col">
                            <div><input type={props.inputType} name={props.inputName} placeholder={props.title}
                                value={props.children}
                                required /></div>
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

export default SingleInput
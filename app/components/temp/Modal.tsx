"use client"
import React, { MouseEventHandler, ReactNode } from 'react'
type propsType = {
    id:string,
    title: string,
    isHidden: boolean,
    zIndex: number,
    modalClass: string,
    children: ReactNode,
    additionBtn: ReactNode,
    closeBtn: MouseEventHandler<HTMLButtonElement>
}
const Modal = (props: propsType) => {
    return (
        <>
            <div id={props.id} className="modal" style={{ display: props.isHidden ? 'block' : 'none', zIndex: props.zIndex }} >
                <div className="modal_bg"></div>
                <div className="modal_body">
                    <div className="sign_up">
                        <div className="modal_head">
                            <div>
                                <h3>{props.title}</h3>
                            </div>
                            <div>
                                {props.additionBtn}
                                <div className='close'><button type='button' onClick={props.closeBtn} ><i className="fa-solid fa-xmark"></i></button></div>
                            </div>
                        </div>

                        <div className={props.modalClass}>

                            {props.children}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
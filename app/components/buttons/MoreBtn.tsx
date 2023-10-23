"use client"
import React, { useState } from 'react'

const MoreBtn = (props:any) => {
    const [isHidden, setIsHidden] = useState(true);
    const toggleModal = () => {
        setIsHidden(!isHidden)
    }
    return (
        <>
            <button onClick={toggleModal} className="more_btn_cont">more <i className="fa-solid fa-caret-down"></i></button>
            <div id='morebtn' style={{ display: isHidden ? `none` : `block` }} className="more_list">
                <ul>
                    {props.children}
                </ul>
            </div>
        </>
    )
}

export default MoreBtn
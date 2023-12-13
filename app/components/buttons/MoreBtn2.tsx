"use client"
import React, { useState } from 'react'

interface propType {
    btnClass:any;
    moreText:any;
    children:any;
}

const MoreBtn = (props: propType) => {
    const [isHidden, setIsHidden] = useState(true);
    const toggleModal = () => {
        setIsHidden(!isHidden)
    }
    return (
        <>
            <div className={"position-relative " + props.btnClass} >
                <button onClick={toggleModal} className="more_btn_cont">{props.moreText}</button>
                <div id='morebtn' style={{ display: isHidden ? `none` : `block` }} className="more_list">
                    <ul onClick={toggleModal}>
                        {props.children}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MoreBtn
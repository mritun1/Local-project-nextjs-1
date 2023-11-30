import React, { useState } from 'react'

interface propsType {
    alertClass: string;
    text: string;
    state:boolean;
    clickClose:()=>void;
}

const AlertNotice = (props: propsType) => {
    return (
        <>
            {props.state ? (
                <div className={"alert " + props.alertClass}>
                    <div>
                        <h5>{props.text}</h5>
                    </div>
                    <div>
                        <div>
                            <button onClick={props.clickClose} className='close'><i className="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>
                </div>
            ) : null}

        </>
    )
}

export default AlertNotice
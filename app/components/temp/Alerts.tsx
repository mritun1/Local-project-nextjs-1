"use client"
import React from 'react'

type AlertTypes = {
    alert:string,
    msg:string
}

const Alerts = (props:AlertTypes) => {
    if(props.alert == 'success'){
        return (
            <>
                <div id='alerts' className="error_status success">
                    <div >
                        <button><i className="fa-solid fa-check"></i></button>
                    </div>
                    <div>
                        <p>{props.msg}</p>
                    </div>
                </div>
            </>
        )
    }else if(props.alert == 'danger'){
        return (
            <>
                <div id='alerts' className="error_status danger">
                    <div >
                        <button><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div>
                        <p>{props.msg}</p>
                    </div>
                </div>
            </>
        )
    }
}

export default Alerts
"use client"
import React, { useState } from 'react'

type AlertTypes = {
    alert:string,
    msg:string
}

const Alerts = (props:AlertTypes) => {

    const [isHidden,setIsHidden] = useState<boolean>(false)
    const toggleHidden = () => {
        setIsHidden(!isHidden)
    }

    if (props.msg){
        if(props.alert == 'success'){
            return (
                <>
                    <div id='alerts' style={{ display: isHidden?'none': 'block' }} className="error_status success">
                        <div >
                            <button onClick={toggleHidden}><i className="fa-solid fa-check"></i></button>
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
                    <div id='alerts2' onClick={toggleHidden} style={{ display: isHidden ? 'none' : 'block' }} className="error_status danger">
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
}

export default Alerts
"use client"
import React, { useEffect, useState } from 'react'

type AlertTypes = {
    display:boolean,
    alert: string,
    msg: string
}

const Alerts = (props: AlertTypes) => {
    const [icons,setIcons] = useState<any>(null)
    useEffect(()=>{
        if(props.alert == 'success'){
            setIcons(<i className="fa-solid fa-check"></i>)
        }else{
            setIcons(<i className="fa-solid fa-xmark"></i>)
        }
    },[props.alert])
    return (
        <>
            <div id='alerts' style={{ display: props.display ? 'block' : 'none' }} className={`error_status ${props.alert}`}>
                <div >
                    <button >
                        {icons}
                    </button>
                </div>
                <div>
                    <p>{props.msg}</p>
                </div>
            </div>
        </>
    )
}

export default Alerts
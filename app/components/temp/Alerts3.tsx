"use client"
import React, { MouseEventHandler, useEffect, useState } from 'react'

type AlertTypes = {
    alert: string,
    msg: string,
    isHidden: boolean,
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Alerts3 = (props: AlertTypes) => {

    const [icons, setIcons] = useState<any>(null)
    useEffect(() => {
        if (props.alert == 'success') {
            setIcons(<i className="fa-solid fa-check"></i>)
        } else {
            setIcons(<i className="fa-solid fa-xmark"></i>)
        }
    }, [props.alert])
    return (
        <>
            <div id='alerts' style={{ display: props.isHidden ? 'block' : 'none' }} className={`error_status ${props.alert}`}>
                <div >
                    <button onClick={props.onClick} >
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

export default Alerts3
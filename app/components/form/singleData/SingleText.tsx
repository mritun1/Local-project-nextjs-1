import React from 'react'
type propsType = {
    children: string,
    title:string
}

const singleText = (props:propsType) => {
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
                        <div><button><i className="fa-solid fa-pen-to-square"></i> Edit</button></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default singleText
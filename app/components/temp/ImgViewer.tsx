import React, { useState } from 'react'
import Image from 'next/image'

interface propsType {
    imgView: () => void;
    imgViewState: boolean;
    imgUrl: string | null;
}
const ImgViewer = (props: propsType) => {
    
    return (
        <>
            {props.imgViewState ? (
                <div className="img_viewers">
                    <div className="img_opa"></div>

                    <div className="img_cont">
                        <div>
                            <Image
                                src={props.imgUrl || ''}
                                alt="image"
                                objectFit="contain"
                                layout='responsive'
                                width={100}
                                height={0}
                            />
                        </div>
                    </div>
                    
                    <div className="img_close">
                        <div><button onClick={props.imgView}><i className="fa-solid fa-xmark"></i></button></div>
                    </div>

                </div>
            ) : null}
        </>
    )
}

export default ImgViewer
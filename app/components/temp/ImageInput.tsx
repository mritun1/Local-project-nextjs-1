import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { basename } from 'path';

type propsType = {
    service: string,
    serviceFor: string,
    postId: any,
    imgLists: Array<string>,
    pWidth: string,
    pDisplay: boolean,
    uploadImg: (e: any) => void
}

const ImageInputEvents = (props: propsType) => {
    //UPLOAD IMAGE - NEWS
    const [imgLists, setImgLists] = useState<Array<string>>([])


    //DLETE IMAGE FUNCTION
    const delImg = async (url: string, index: number, service: string) => {
        const confrimState = window.confirm("Are you sure to Delete")
        if (confrimState) {
            const bucket: any = process.env.GCP_BUCKET_NAME;
            const str: string = "https://storage.googleapis.com/" + bucket + "/";
            const imgName = basename(url.replace(str, ""));
            const res = await fetch("/api/image/delete/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: imgName,
                    service: service,
                    serviceType: props.serviceFor,
                    postId: props.postId
                })
            })
            if (res.ok) {
                const data = await res.json()
                if (data.code === 1) {
                    //REMOVE FROM THE LISTS
                    const updateLists = [...imgLists]
                    updateLists.splice(index, 1)
                    setImgLists(updateLists)
                }
            }
        }
    }
    useEffect(() => {
        setImgLists(props.imgLists);
    }, [props.imgLists])
    return (
        <>
            <ProgressBar
                width={props.pWidth}
                display={props.pDisplay}
            ></ProgressBar>

            <input
                type="file"
                onChange={(e) => props.uploadImg(e)}
                name={props.service}
                id={props.service + props.postId}
                style={{ display: `none` }}
            />

            <div className="img_upload_bar">

                <div className='btn_upload' >
                    <label htmlFor={props.service + props.postId}>
                        <div >
                            <div></div>

                            <div className='btn_plus' >
                                <div><i className="fa-solid fa-plus"></i></div>
                            </div>

                        </div>
                    </label>
                </div>

                {imgLists.map((image, index) => (
                    <div key={index} className="btn_img">
                        <div onClick={() => delImg(image, index, props.service)} >
                            <div style={{ backgroundImage: `url(${image})` }}></div>
                            <div className="btn_minus">
                                <div>
                                    <i className="fa-solid fa-minus"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}

export default ImageInputEvents
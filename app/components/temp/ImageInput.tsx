"use client"
import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import axios from 'axios'

type propsType = {
    service: string,
    imgLists: Array<string>
}

const ImageInput = (props: propsType) => {
    //UPLOAD IMAGE - NEWS
    const [imgUploadState, setImgUploadState] = useState<boolean>(true)
    const [imgUploadNum, setImgUploadNum] = useState<number>(0)
    const [imgLists, setImgLists] = useState<Array<string>>([])

    useEffect(() => {
        if (props.imgLists) {
            setImgLists(props.imgLists)
        }
    }, [props.imgLists])

    let source = axios.CancelToken.source();
    const newsImgUpload = async (e: React.ChangeEvent<HTMLInputElement>, service: string) => {
        source.cancel(); // Cancel the previous request, if any
        source = axios.CancelToken.source();
        const fileObj = e.target.files?.[0]
        if (fileObj) {
            setImgUploadState(!imgUploadState)
            const formData = new FormData();
            formData.set("imgFile", fileObj)
            formData.set("service", service)

            axios.post("/api/image/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (event) => {
                    if (event.total !== undefined) {
                        const progress = (event.loaded / event.total) * 100;
                        setImgUploadNum(Math.round(progress));
                    }
                },
                cancelToken: source.token,
            })
                .then((response) => {
                    //console.log('Response data:', response.data);
                    setImgUploadState(true)

                    setImgLists([...imgLists, response.data.image])
                    console.log(imgLists)

                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }
    }
    //DLETE IMAGE FUNCTION
    const delImg = async (url: string, index: number, service: string) => {
        const confrimState = window.confirm("Are you sure to Delete")
        if (confrimState) {
            const imgName = url.replace("https://storage.googleapis.com/localnii-testing/", "")
            const res = await fetch("/api/image/delete/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: imgName,
                    service: service
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
    return (
        <>
            <ProgressBar
                width={imgUploadNum.toString()}
                display={imgUploadState}
            ></ProgressBar>

            <input type="file" onChange={(e) => newsImgUpload(e, props.service)} name={props.service} id={props.service} style={{ display: `none` }} />

            <div id='imgGal' className="img_upload_bar">

                <div className='btn_upload' >
                    <label htmlFor={props.service}>
                        <div >
                            <div></div>

                            <div className='btn_plus' >
                                <div><i className="fa-solid fa-plus"></i></div>
                            </div>

                        </div>
                    </label>
                </div>

                {imgLists ? (
                    imgLists.map((image, index) => (
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
                    ))
                ) : ""}


            </div>
        </>
    )
}

export default ImageInput
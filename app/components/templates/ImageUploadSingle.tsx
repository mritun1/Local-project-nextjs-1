"use client"
import React, { useEffect, useRef, useState } from 'react'
import ProgressBar from '../temp/ProgressBar'
import axios from 'axios'
type propsType={
    pic?:string
}
const ImageUploadSingle = (props:propsType) => {
    const [profileImg, setProfileImg] = useState<string>("")
    //IMAGE UPLOAD
    const [imgProgress, setImgProgress] = useState<string>("0")
    const [progress, setProgress] = useState<boolean>(true)
    const fileInputRef = useRef<HTMLInputElement>(null);

    let source = axios.CancelToken.source();
    const uploadProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgress(false)
        source.cancel(); // Cancel the previous request, if any
        source = axios.CancelToken.source();
        const fileObj = e.target.files?.[0]
        if (fileObj) {

            const formData = new FormData();
            formData.set("imgFile", fileObj)
            formData.set("service", "group_img_draft")
            formData.set("serviceType", 'groups')
            formData.set("postId", "")

            axios.post("/api/image/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (event) => {
                    if (event.total !== undefined) {
                        const progress = (event.loaded / event.total) * 100;
                        setImgProgress(Math.round(progress).toString());
                    }
                },
                cancelToken: source.token,
            })
                .then((response) => {
                    setProgress(true)
                    // console.log(response)
                    if (response.data.code === 1) {
                        // console.log(response.data.image)
                        setProfileImg(response.data.image);
                        // console.log(profileImg)
                    }

                    if (fileInputRef.current) {
                        // Clear the value of the file input
                        fileInputRef.current.value = '';
                    }

                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }
    }

    const handleButtonClick = () => {
        // Programmatically trigger the file input
        fileInputRef.current?.click();
    };
    return (
        <>
            <div className="profile_sec">
                <div >
                    <div className="center_profile">
                        <div>
                            <div style={{ backgroundImage: `url(${
                                profileImg != '' ? profileImg :props.pic
                                })` }}></div>
                        </div>
                        <div>
                            <div>

                                <br /><br />
                                <ProgressBar
                                    width={imgProgress}
                                    display={progress}
                                ></ProgressBar>

                                {progress ? (
                                    <button style={{ padding: `6px` }} className='orange_btn text-color2' onClick={handleButtonClick}>
                                        <b><i className="fa-solid fa-pen-to-square"></i> Change</b>
                                    </button>
                                ) : (
                                    null
                                )}

                                <input
                                    type="file"
                                    className='text-color2'
                                    name="upload_file"
                                    id="upload_file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => uploadProfile(e)}
                                    ref={fileInputRef}
                                />


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ImageUploadSingle
"use client"
import DoubleInput from '@/app/components/form/singleData/DoubleInput'
import RadioInput from '@/app/components/form/singleData/RadioInput'
import SingleInput from '@/app/components/form/singleData/SingleInput'
import ProgressBar from '@/app/components/temp/ProgressBar'
import AppContent from '@/app/components/templates/AppContent'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const Profile = () => {
    const [isSingleInputHidden, setIsSingleInputHidden] = useState<boolean>(false)
    const [isPinCodeHidden, setIsPinCodeHidden] = useState<boolean>(false)
    const [isNameHidden, setIsNameHidden] = useState<boolean>(false)
    const [isRadioHidden, setRadioHidden] = useState<boolean>(false)
    const [isProfession, setIsProfession] = useState<boolean>(false)

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [professionX, setProfession] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [mobile, setMobile] = useState<number>(0)
    const [pincode, setPincode] = useState<number>(0)
    const [profileImg, setProfileImg] = useState<string>("")

    const loadMe = async () => {
        try {
            const res = await fetch("/api/auth/me",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if (res.ok) {
                const data = await res.json()
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setProfession(data.profession)
                setGender(data.gender)
                setMobile(data.mobile)
                setPincode(data.pinCode)
                setProfileImg(data.profilePic)
            } else {
                console.log("something wrong")
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadMe()
    }, [])

    // const showModal = () => {
    //     setIsSingleInputHidden(!isSingleInputHidden)
    // }

    const pinCodeModal = () => {
        setIsPinCodeHidden(!isPinCodeHidden)
    }

    const nameModal = () => {
        setIsNameHidden(!isNameHidden)
    }

    const radioBtn = () => {
        setRadioHidden(!isRadioHidden)
    }

    const professionModal = () => {
        setIsProfession(!isProfession)
    }

    //IMAGE UPLOAD
    const [imgProgress, setImgProgress] = useState<string>("0")
    const [progress,setProgress] = useState<boolean>(true)
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
            formData.set("service", "profile_img")
            formData.set("serviceType", 'profile')
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
                    if (response.data.code === 1){
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

            <AppContent
                mainContent={
                    <div id='profile_set' className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3 ><i className="fa-solid fa-id-badge icon-list"></i> Profile</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>{pincode}  <button ><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>



                        <div className="profile_sec">
                            <div >
                                <div className="center_profile">
                                    <div>
                                        <div style={{ backgroundImage: `url(${!profileImg?'/icons/others/profile.webp':profileImg})` }}></div>
                                    </div>
                                    <div>
                                        {/* <div>
                                            <h3>Justin Electric store</h3>
                                        </div> */}
                                        <div>

                                            {/* <label className="online_offline">
                                                <input type="checkbox" defaultChecked={true} />
                                                <span className="slider round"></span>
                                            </label> */}

                                            <br /><br />
                                            <ProgressBar
                                                    width={imgProgress}
                                                    display={progress}
                                                ></ProgressBar>

                                            {progress?(
                                                <button style={{ padding: `6px` }} className='orange_btn text-color2' onClick={handleButtonClick}>
                                                    <b><i className="fa-solid fa-pen-to-square"></i> Change</b>
                                                </button>
                                            ):(
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
                            {/* <div>
                                <div>
                                    <button>Delivery Boy (1)</button>
                                </div>
                                <div>

                                    <div className="more_btn">
                                        783360

                                        <MoreBtn>
                                            <li><i className="fa-solid fa-pen-to-square"></i> Edit</li>
                                            <li><i className="fa-solid fa-rectangle-ad"></i> Promote</li>
                                            <li><i className="fa-solid fa-share"></i> Share</li>
                                        </MoreBtn>
                                    </div>

                                </div>
                            </div> */}
                        </div>


                        <DoubleInput
                            id="fullName"
                            title='Name'
                            inputName1='firstName'
                            inputName2='lastName'
                            placeHolder1='First Name'
                            placeHolder2='Last Name'
                            inputType1='text'
                            inputType2='text'
                            inputVal1={firstName}
                            inputVal2={lastName}
                            isModalHidden={isNameHidden}
                            modalClass=''
                            additionalBtn={''}
                            onClick={nameModal}
                        >null</DoubleInput>

                        <SingleInput
                            id="profession"
                            title='Profession'
                            inputName='profession'
                            inputType='text'
                            isModalHidden={isProfession}
                            modalClass=''
                            additionalBtn={''}
                            onClick={professionModal}
                        >{professionX}</SingleInput>


                        <RadioInput
                            id="genders"
                            title='Gender'
                            inputName='gender'
                            inputType='text'
                            isModalHidden={isRadioHidden}
                            modalClass=''
                            additionalBtn={''}
                            onClick={radioBtn}
                        >{gender}</RadioInput>

                        <div className="singleData">
                            <div>
                                <p>Mobile Number</p>
                            </div>
                            <div>
                                <div>
                                    <div><h3>{mobile}</h3></div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>

                        <SingleInput
                            id="pin"
                            title='Pin Code'
                            inputName='pinCode'
                            inputType='number'
                            isModalHidden={isPinCodeHidden}
                            modalClass=''
                            additionalBtn={''}
                            onClick={pinCodeModal}
                        >{pincode}</SingleInput>




                    </div>
                }
                rightBar={``}
            ></AppContent>

        </>
    )
}

export default Profile
"use client"
import DoubleInput from '@/app/components/form/singleData/DoubleInput'
import RadioInput from '@/app/components/form/singleData/RadioInput'
import SingleInput from '@/app/components/form/singleData/SingleInput'
import AppContent from '@/app/components/templates/AppContent'
import React, { useEffect, useState } from 'react'

const Page = () => {
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

    const loadMe = async () => {
        try {
            const res = await fetch("/api/auth/me")
            if (res.ok) {
                const data = await res.json()
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setProfession(data.profession)
                setGender(data.gender)
                setMobile(data.mobile)
                setPincode(data.pinCode)
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

    const showModal = () =>{
        setIsSingleInputHidden(!isSingleInputHidden)
    }

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
                                    <h4>78336  <button ><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
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

                        <SingleInput
                            id="mobile"
                            title='Mobile Number'
                            inputName='mobile'
                            inputType='number'
                            isModalHidden={isSingleInputHidden}
                            modalClass=''
                            additionalBtn={''}
                            onClick={showModal}
                        >{mobile}</SingleInput>

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

export default Page
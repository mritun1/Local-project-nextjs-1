"use client"
import DoubleInput from '@/app/components/form/singleData/DoubleInput'
import RadioInput from '@/app/components/form/singleData/RadioInput'
import SingleInput from '@/app/components/form/singleData/SingleInput'
import AppContent from '@/app/components/templates/AppContent'
import React, { useState } from 'react'

const Page = () => {
    const [isSingleInputHidden,setIsSingleInputHidden] = useState<boolean>(false)
    const showModal = () =>{
        setIsSingleInputHidden(!isSingleInputHidden)
    }

    const [isPinCodeHidden, setIsPinCodeHidden] = useState<boolean>(false)
    const pinCodeModal = () => {
        setIsPinCodeHidden(!isPinCodeHidden)
    }

    const [isNameHidden, setIsNameHidden] = useState<boolean>(false)
    const nameModal = () => {
        setIsNameHidden(!isNameHidden)
    }

    const [isRadioHidden, setRadioHidden] = useState<boolean>(false)
    const radioBtn = () => {
        setRadioHidden(!isRadioHidden)
    }

    const [isProfession, setIsProfession] = useState<boolean>(false)
    const professionModal = () => {
        setIsProfession(!isProfession)
    }

    return (
        <>

            <AppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-id-badge icon-list"></i> Profile</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>78336 <button><i className="fa-solid fa-location-dot"></i></button></h4>
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
                            inputVal1={'Mritunjoy'}
                            inputVal2={'Mushahary'}
                            isModalHidden={isNameHidden}
                            modalClass=''
                            additionalBtn={''}
                            onClick={nameModal}
                        >Mritunjoy Mushahary</DoubleInput>

                        <SingleInput
                            id="profession"
                            title='Profession'
                            inputName='profession'
                            inputType='text'
                            isModalHidden={isProfession}
                            modalClass=''
                            additionalBtn={''}
                            onClick={professionModal}
                        >Software Engineer</SingleInput>

                        <RadioInput 
                            id="radioBtn"
                            title='Mobile Number'
                            inputName='mobile'
                            inputType='number'
                            isModalHidden={isRadioHidden}
                            modalClass=''
                            additionalBtn={''}
                            onClick={radioBtn} 
                        >Female</RadioInput>

                        <SingleInput
                            id="mobile"
                            title='Mobile Number'
                            inputName='mobile'
                            inputType='number'
                            isModalHidden={isSingleInputHidden}
                            modalClass=''
                            additionalBtn={''}
                            onClick={showModal}
                        >8011501382</SingleInput>

                        <SingleInput
                            id="pin"
                            title='Pin Code'
                            inputName='pinCode'
                            inputType='number'
                            isModalHidden={isPinCodeHidden}
                            modalClass=''
                            additionalBtn={''}
                            onClick={pinCodeModal}
                        >783360</SingleInput>




                    </div>
                }
                rightBar={``}
            ></AppContent>

        </>
    )
}

export default Page
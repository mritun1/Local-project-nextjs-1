"use client"
import React, { useState } from 'react'
import LeftMenu from './LeftMenu'
import PinModel from './PinModel';

const MainContent = () => {

    const [isHidden, setIsHidden] = useState<boolean>(false);

    const toggleModal = () => {
        setIsHidden(!isHidden)
    }

    return (
        <>
            <div className="col_left">

                <div>

                    <LeftMenu
                        toggleModal={toggleModal}
                    ></LeftMenu>

                </div>

            </div>

            <PinModel
                toggleModal={toggleModal}
                isHidden={isHidden}
            ></PinModel>

        </>
    )
}

export default MainContent
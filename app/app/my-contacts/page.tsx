"use client"
import AppContent from '@/app/components/templates/AppContent'
import React, { useEffect } from 'react'

const MyContacts = () => {

    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-tag"></i> My Contact (0)</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>0 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        <div className="service-not-available">
                            <div>
                                <h2><i className="fa-regular fa-hourglass-half"></i></h2>
                                <h3>Coming Soon! Please wait for some more days.</h3>
                                <h1>Thank You.</h1>
                            </div>
                        </div>


                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default MyContacts
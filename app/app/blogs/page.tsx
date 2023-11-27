import AppContent from '@/app/components/templates/AppContent'
import React from 'react'

const page = () => {
    return (
        <>

            <AppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-store icon-list"></i> Blogs</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>00000 <button><i className="fa-solid fa-location-dot"></i></button></h4>
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

export default page
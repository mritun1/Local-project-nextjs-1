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
                                    <h3><i className="fa-solid fa-bullhorn icon-list"></i> My Advertisement</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <!-- Some code here --> */}
                                </div>
                            </div>
                        </div>

                        <div className="service-not-available">
                            <div>
                                <h2><i className="fa-solid fa-triangle-exclamation"></i></h2>
                                <h3>Sorry! Service not available.</h3>
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
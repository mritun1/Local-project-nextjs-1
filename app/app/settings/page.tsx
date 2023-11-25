import ChangePassword from '@/app/components/pages/settings/ChangePassword'
import AppContent from '@/app/components/templates/AppContent'
import React from 'react'

const Settings = () => {
    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3 ><i className="fa-solid fa-gear icon-list"></i> Settings</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <h4>78336  <button ><i className="fa-solid fa-location-dot"></i></button></h4> */}
                                </div>
                            </div>
                        </div>

                        <ChangePassword></ChangePassword>

                    </div>
                }
                rightBar={``}
            ></AppContent>
        </>
    )
}

export default Settings
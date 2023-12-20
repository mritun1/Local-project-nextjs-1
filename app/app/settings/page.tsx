"use client"
import ChangeContactPremission from '@/app/components/pages/settings/ChangeContactPremission'
import ChangePassword from '@/app/components/pages/settings/ChangePassword'
import AppContent from '@/app/components/templates/AppContent'
import React, { useEffect, useState } from 'react'

const Settings = () => {
    const [dataVal, setDataVal] = useState<string>("Sell");
    const load = async () => {
        const res = await fetch("/api/auth/me", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            setDataVal(data.contactPermission)
        }
    }
    useEffect(() => {
        load();
        return () => { }
    }, [])
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

                        <ChangeContactPremission
                            dataVal={dataVal}
                            load={load}
                        />

                    </div>
                }
                rightBar={``}
            ></AppContent>
        </>
    )
}

export default Settings
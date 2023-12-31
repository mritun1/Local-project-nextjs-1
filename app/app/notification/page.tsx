"use client"
import AppContent from '@/app/components/templates/AppContent'
import React, { useEffect, useState } from 'react'
interface items{
    createdDate:number;
    message:string;
    notificationType:string;
    seen:number;
    sendType:string;
    userId:string;
    _id:string;
}
const Notifications = () => {
    const [items, setItems] = useState<items[]>([]);
    const fetching = async () => {
        const res = await fetch("/api/notifications/all/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: 1
            })
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            if (data.code === 1) {
                setItems(data.data)
            }
        }
    }
    useEffect(()=>{
        fetching();
        return ()=>{}
    })
    const redirect = async (e:string,id:string) =>{
        const res = await fetch("/api/notifications/seen/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id:id
            })
        });
        if (e === 'wallet'){
            window.location.href = '/app/my-wallet/';
        }else{
            fetching();
        }
        
    }
    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-tag"></i> Notifications (0)</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>0 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        <div className="notifications">

                            {items.map((ele,index)=>(
                                <div key={index} className={ele.seen ? 'notification_list' : ('active notification_list')}>
                                    <div>
                                        <div style={{ backgroundImage: `url(/icons/others/notification.png)` }}></div>
                                    </div>
                                    <div onClick={() => redirect(ele.notificationType,ele._id)}>
                                        <p>
                                            <b>{ele.notificationType}:</b> {ele.message}
                                        </p>
                                    </div>
                                    <div>
                                        <button><i className="fa-solid fa-ellipsis"></i></button>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default Notifications
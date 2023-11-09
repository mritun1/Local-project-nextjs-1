"use client"
import AppContent from '@/app/components/templates/AppContent'
import customDate from '@/app/lib/customDate';
import React, { useEffect, useState } from 'react'

interface EventItems {
    createdDate:number;
    des: string;
    endDate: string;
    images: Array<string>;
    pin:number;
    report:number;
    startDate: string;
    title: string;
    updatedDate: number;
    userId: string;
    _id: string;
}

const Page = () => {

    const [eventList, setEventLists] = useState<EventItems[]>([]);
    const newDate = new customDate();
    const [pin, setPin] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [notFound,setNotFound] = useState<boolean>(false);

    const loadEvents = async() =>{
        const res = await fetch("/api/posts/events/all/");
        if(res.ok){
            const data = await res.json()
            if (data.code === 1){
                setEventLists(data.data)
                setPin(data.data[0].pin)
                setTotal(data.data.length)
                if (data.data.length>0){
                    setNotFound(true)
                }
            }
        }else{
            setNotFound(false)
            console.log("Error: something wrong fetching")
        }
    }
    useEffect(()=>{
        loadEvents();
    },[])
    return (
        <>
            <AppContent
                mainContent={
                    <>
                        <div className="main_content" >

                            <div className="title_bar">
                                <div>
                                    <div>
                                        <h3><i className="fa-regular fa-calendar icon-list"></i> Local Events ({total})</h3>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h4>{pin} <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                    </div>
                                </div>
                            </div>

                            {notFound?(
                                eventList.map((ele,index)=>(
                                    <div key={index} className="offer_post event_posts" style={{ height: `520px` }}>
                                        <div className="events_cont">
                                            <div>

                                                <div className="event_date">
                                                    <h3><span className="event_date">Date:</span> {newDate.isoToMonth(ele.startDate)} - {newDate.isoToMonth(ele.endDate)}</h3>
                                                </div>

                                                <div className="product_images">
                                                    <div className="news_img_sec" style={{ backgroundImage: `url(https://newspaperads.ads2publish.com/wp-content/uploads/2017/10/56th-sunder-nagar-diwali-mela-ad-delhi-times-13-10-2017.jpg)` }}>
                                                        <div className="news_img_btn_left">
                                                            <div><i className="fa-solid fa-angle-left"></i></div>
                                                        </div>
                                                        <div className="news_img_btn_right">
                                                            <div><i className="fa-solid fa-angle-right"></i></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="product_title">
                                                    <h2>{ele.title}</h2>
                                                </div>
                                                <div className="news_des">
                                                    <div>
                                                        <p className="text-color">{ele.des}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="profile">
                                            <div className="profile_name">
                                                <a href=""><h5>Hero Name</h5></a>
                                            </div>
                                            <div className="profile_img">
                                                <div style={{ backgroundImage: `url(https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg)` }}></div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                                
                            ):(
                                    <div className="service-not-available">
                                        <div>
                                            <h2><i className="fa-solid fa-triangle-exclamation"></i></h2>
                                            <h3>Sorry! No content Found.</h3>
                                        </div>
                                    </div>
                            )}



                        </div>

                        

                    </>
                }
                rightBar={``}
            />
        </>
    )
}

export default Page
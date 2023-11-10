"use client"
import AppContent from '@/app/components/templates/AppContent'
import customDate from '@/app/lib/customDate';
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import React, { SetStateAction, useEffect, useRef, useState } from 'react'

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
    const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);

    const loadEvents = async() =>{
        const res = await fetch("/api/posts/events/all/");
        if(res.ok){
            const data = await res.json()
            setPin(data.pin)
            if (data.code === 1){
                setEventLists(data.data)
                setTotal(data.data.length)
                if (data.data.length>0){
                    setNotFound(true)
                    //Create Image Circular linked list array
                    const arr = data.data;
                    
                    const doublyLinkedLists: DoublyCircularLinkedList[] = [];
                    arr.forEach((ele: EventItems) => {
                        const doublyLL = new DoublyCircularLinkedList();
                        ele.images.forEach((item) => {
                            doublyLL.append(item);
                        });
                        doublyLinkedLists.push(doublyLL);
                    });
                    setDoublyLinkedLists(doublyLinkedLists)

                }
            } 
        }else{
            setNotFound(false)
            console.log("Error: something wrong fetching")
        }
    }

    const [imgState, setImgState] = useState<number | null>(null)
    const [imgUrl,setImgUrl] = useState<string | null>(null)
    const getNextImg = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        setImgState(index);
        setImgUrl(doublyLinkedLists[index].getNextData());
    };
    const getPrevImg = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        setImgState(index);
        setImgUrl(doublyLinkedLists[index].getPrevData());
    };

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
                                                    <div className="news_img_sec" 
                                                        style={{ 
                                                            backgroundImage: `url(${
                                                                imgState === index? imgUrl:
                                                                ele.images[0]
                                                            })` 
                                                        }}>
                                                        <div className="news_img_btn_left">
                                                            <div onClick={getPrevImg(index)}><i className="fa-solid fa-angle-left"></i></div>
                                                        </div>
                                                        <div className="news_img_btn_right">
                                                            <div onClick={getNextImg(index)} ><i className="fa-solid fa-angle-right"></i></div>
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
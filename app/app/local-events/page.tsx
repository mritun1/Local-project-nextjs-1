"use client"
import ButtonLoading from '@/app/components/temp/ButtonLoading';
import AppContent from '@/app/components/templates/AppContent'
import seenUpdate from '@/app/customlib/seenUpdate';
import customDate from '@/app/lib/customDate';
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface EventItems {
    item: {
        createdDate: number;
        des: string;
        endDate: string;
        images: Array<string>;
        pin: number;
        report: number;
        startDate: string;
        title: string;
        updatedDate: number;
        userId: string;
        _id: string;
    };
    user: {
        firstName: string;
        lastName: string;
    };
}

const Page = () => {

    const [eventList, setEventLists] = useState<EventItems[]>([]);
    const newDate = new customDate();
    const [pin, setPin] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [notFound, setNotFound] = useState<boolean>(true);
    const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);
    const [infinityLod, setInfinityLoad] = useState<boolean>(true)
    const [pNum,setPnum] = useState<number>(1);

    const loadEvents2 = (num: number) => {
        setInfinityLoad(false)
        fetch(`/api/posts/events/all/${num}/0/`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache, no-store',
            },
        })
            .then(response => response.json())
            .then(data => {
                setPin(data.pin)
                if (data.code === 1) {
                
                    setEventLists((prevData) => [...prevData, ...data.data]);
                    setTotal((prevData) => prevData + data.data.length);
                    setPnum((prev)=>prev + 1)

                    if (data.data.length > 0) {
                        
                        //Create Image Circular linked list array
                        const arr = data.data;

                        const doublyLinkedLists: DoublyCircularLinkedList[] = [];
                        arr.forEach((ele: EventItems) => {
                            const doublyLL = new DoublyCircularLinkedList();
                            ele.item.images.forEach((item) => {
                                doublyLL.append(item);
                            });
                            doublyLinkedLists.push(doublyLL);
                        });
                        setDoublyLinkedLists(prevData => [...prevData, ...doublyLinkedLists])

                    }else{
                        setNotFound(false)
                    }
                    setInfinityLoad(true)
                } else {
                    setInfinityLoad(true)
                    // setNotFound(false)
                }
            })
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadEvents2(pNum);
            }
        };

        // Add the event listener
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }

        // Remove the event listener when the component unmounts
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [pNum]);

    const seenUpdater = new seenUpdate();
    const pathname = usePathname();

    useEffect(() => {
        return () => {
            loadEvents2(1);
            seenUpdater.update(pathname);
        };
    }, []);

    const [imgState, setImgState] = useState<number | null>(null)
    const [imgUrl, setImgUrl] = useState<string | null>(null)
    const getNextImg = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        setImgState(index);
        setImgUrl(doublyLinkedLists[index].getNextData());
    };
    const getPrevImg = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        setImgState(index);
        setImgUrl(doublyLinkedLists[index].getPrevData());
    };

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

                            {notFound ? (
                                eventList.map((ele, index) => (
                                    <div key={index} className="offer_post event_posts" style={{ height: `520px` }}>

                                        <div className="events_cont">
                                            <div>

                                                <div className="event_date">
                                                    <h3><span className="event_date">Date:</span> {newDate.isoToMonth(ele.item.startDate)} - {newDate.isoToMonth(ele.item.endDate)}</h3>
                                                </div>

                                                <div className="product_images">
                                                    <div className="news_img_sec"
                                                        style={{
                                                            backgroundImage: `url(${imgState === index ? imgUrl :
                                                                    ele.item.images[0]
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
                                                    <h2>{ele.item.title}</h2>
                                                </div>
                                                <div className="news_des">
                                                    <div>
                                                        <p className="text-color">{ele.item.des}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="profile">
                                            <div className="profile_name">
                                                <a href=""><h5>{ele.user.firstName} {ele.user.lastName}</h5></a>
                                            </div>
                                            <div className="profile_img">
                                                <div style={{ backgroundImage: `url(https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg)` }}></div>
                                            </div>

                                        </div>
                                    </div>
                                ))

                            ) : (
                                <div className="service-not-available">
                                    <div>
                                        <h2><i className="fa-solid fa-triangle-exclamation"></i></h2>
                                        <h3>Sorry! No content Found.</h3>
                                    </div>
                                </div>
                            )}
                            
                            <ButtonLoading
                                submitLoad={infinityLod}
                            >Not found</ButtonLoading>


                        </div>



                    </>
                }
                rightBar={``}
            />
        </>
    )
}

export default Page

function loadEventsIfNeeded() {
    throw new Error('Function not implemented.');
}

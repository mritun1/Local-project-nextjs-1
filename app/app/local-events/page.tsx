"use client"
import EventPost from '@/app/components/pages/posts/events/EventPost';
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
        profilePic: string;
    };
}

const LocalEvents = () => {

    const [eventList, setEventLists] = useState<EventItems[]>([]);
    const newDate = new customDate();
    const [pin, setPin] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [notFound, setNotFound] = useState<boolean>(true);
    const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);
    const [infinityLod, setInfinityLoad] = useState<boolean>(true)
    const [pNum, setPnum] = useState<number>(1);

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

                console.log(data)

                if (data.code === 1) {

                    setEventLists((prevData) => [...prevData, ...data.data]);
                    setTotal((prevData) => prevData + data.data.length);
                    setPnum((prev) => prev + 1)

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

                    } else {
                        setNotFound(false)
                    }
                    setInfinityLoad(true)
                } else {
                    setInfinityLoad(true)
                    if (num === 1) {
                        setNotFound(false)
                    }
                }
            })
            .catch(error=>{
                console.error('Fetch error:',error);
            })
    }

    const pathname = usePathname();

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

        const seenUpdater = new seenUpdate();
        seenUpdater.update(pathname);

        // Remove the event listener when the component unmounts
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [pNum, pathname]);
    
    useEffect(() => {
        loadEvents2(1);   
        return () => {};
    }, []);

    

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
                                    <EventPost
                                        key={index}
                                        index={index}
                                        images={ele.item.images}
                                        startDate={ele.item.startDate}
                                        endDate={ele.item.endDate}
                                        doublyLinkedLists={doublyLinkedLists}
                                        id={ele.item._id}
                                        title={ele.item.title}
                                        des={ele.item.des}
                                        profilePic={ele.user.profilePic}
                                        firstName={ele.user.firstName}
                                        lastName={ele.user.lastName}
                                        
                                    />
                                    
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
                            >.</ButtonLoading>

                            <br /><br /><br /><br />

                        </div>



                    </>
                }
                rightBar={``}
            />
        </>
    )
}

export default LocalEvents

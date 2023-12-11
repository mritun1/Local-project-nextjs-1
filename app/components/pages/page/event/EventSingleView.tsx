"use client"
import BlogAppContent from '@/app/components/pages/blogs/BlogAppContent'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import EventPost from '@/app/components/pages/posts/events/EventPost'
import LoginBlockDiv from '@/app/components/temp/LoginBlockDiv';

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

const EventSingleView = () => {
    const { id } = useParams();

    const [eventList, setEventLists] = useState<EventItems[]>([]);
    const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);

    useEffect(() => {
        const loadEvents2 = (num: number) => {
            fetch(`/api/posts/events/single/` + id, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache, no-store',
                },
            })
                .then(response => response.json())
                .then(data => {


                    if (data.code === 1) {

                        setEventLists((prevData) => [...prevData, ...data.data]);

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

                        }
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                })
        }
        loadEvents2(1);
        return () => {
            loadEvents2(1);
        };
    }, [id]);
    return (
        <>
            <LoginBlockDiv></LoginBlockDiv>

            <BlogAppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-circle-info icon-list"></i> Event</h3>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>

                        {eventList.map((ele, index) => (
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

                        ))}



                    </div>
                }
            ></BlogAppContent>
        </>
    )
}

export default EventSingleView
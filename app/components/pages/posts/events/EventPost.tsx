"use client"
import ImgViewer from '@/app/components/temp/ImgViewer';
import PostOptions from '@/app/components/temp/PostOptions'
import customDate from '@/app/lib/customDate';
import React, { useState } from 'react'
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
interface propsType {
    index: number;
    images: Array<string>;
    startDate: string;
    endDate: string;
    id: string;
    title: string;
    des: string;
    profilePic: string;
    firstName: string;
    lastName: string;
    doublyLinkedLists: DoublyCircularLinkedList[];
}
const EventPost = (props:propsType) => {
    const [imgViewState, setImgViewState] = useState<boolean>(false);
    const imgView = () => {
        setImgViewState(!imgViewState);
    }
    const newDate = new customDate();

    const [imgState, setImgState] = useState<number | null>(null)
    const [imgUrl, setImgUrl] = useState<string | null>(null)
    const getNextImg = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        setImgState(index);
        setImgUrl(props.doublyLinkedLists[index].getNextData());
    };
    const getPrevImg = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        setImgState(index);
        setImgUrl(props.doublyLinkedLists[index].getPrevData());
    };

    return (
        <>
            <div key={props.index} className="offer_post event_posts" style={{ height: `520px` }}>

                <ImgViewer
                    imgViewState={imgViewState}
                    imgView={imgView}
                    imgUrl={imgState === props.index ? imgUrl : props.images[0]}
                />

                <div className="events_cont">
                    <div>

                        <div className="event_date">
                            <h3><span className="event_date">Date:</span> {newDate.isoToMonth(props.startDate)} - {newDate.isoToMonth(props.endDate)}</h3>
                        </div>

                        <div className="product_images">
                            <div className="news_img_sec"
                                style={{
                                    backgroundImage: `url(${imgState === props.index ? imgUrl :
                                        props.images[0]
                                        })`
                                }}>
                                <div className="news_img_btn_left">
                                    <div onClick={getPrevImg(props.index)}><i className="fa-solid fa-angle-left"></i></div>
                                </div>
                                <div className="news_img_btn_right">
                                    <div onClick={getNextImg(props.index)} ><i className="fa-solid fa-angle-right"></i></div>
                                </div>
                                <div className="img_btn_center">
                                    <div><button onClick={imgView}>View Image</button></div>
                                </div>
                            </div>
                        </div>

                        <PostOptions
                            itemId={props.id}
                            itemType='Events'
                            itemTitle={props.title}
                        />

                        <div className="product_title">
                            <h2>{props.title}</h2>
                        </div>
                        <div className="news_des">
                            <div>
                                <p className="text-color">{props.des}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="profile">
                    <div className="profile_name">
                        <a href=""><h5>{props.firstName} {props.lastName}</h5></a>
                    </div>
                    <div className="profile_img">
                        <div style={{ backgroundImage: `url(${props.profilePic ? props.profilePic : '/icons/others/profile.webp'})` }}></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EventPost
"use client"
import ImgViewer from '@/app/components/temp/ImgViewer';
import PostOptions from '@/app/components/temp/PostOptions'
import customDate from '@/app/lib/customDate';
import React, { useState } from 'react'
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import MoreBtn from '@/app/components/buttons/MoreBtn';
import NewsDesMore from '../news/NewsDesMore';
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
            <div className="offer_post"  >

                <ImgViewer
                    imgViewState={imgViewState}
                    imgView={imgView}
                    imgUrl={imgState === props.index ? imgUrl : props.images[0]}
                />

                <div className="product">

                    <div className="product_news">
                        <div className="news_date" >
                            <div>
                                <h3 ><span className="date">Date:</span> {newDate.isoToMonth(props.startDate)} - {newDate.isoToMonth(props.endDate)}</h3>
                            </div>

                            <div className="more_btn" >

                                <MoreBtn>
                                    <li><i className="fa-regular fa-flag"></i> Report</li>
                                    <li><i className="fa-solid fa-rectangle-ad"></i> Promote</li>
                                </MoreBtn>
                            </div>

                        </div>

                        {props.images[0] ? (
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
                        ) : null}

                        <div className="product_title">
                            <h2>{props.title}</h2>
                        </div>

                        <NewsDesMore
                            des={props.des}
                        />

                        <PostOptions
                            itemId={props.id}
                            itemType='Events'
                            itemTitle={props.title}
                        />

                    </div>

                </div>

                <div className="store">
                    <div className="store_profile">
                        <div>
                            <div style={{ backgroundImage: `url(${props.profilePic ? props.profilePic : '/icons/others/profile.webp'})` }} className="img"></div>
                        </div>
                        <div>
                            <div>
                                <a href="">
                                    <h5>{props.firstName} {props.lastName}</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EventPost
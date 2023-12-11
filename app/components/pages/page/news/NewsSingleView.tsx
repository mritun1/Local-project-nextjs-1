"use client"
import React, { useEffect, useState } from 'react';
import BlogAppContent from '@/app/components/pages/blogs/BlogAppContent'
import NewsPost from '@/app/components/pages/posts/news/NewsPost'
import { useParams } from 'next/navigation'
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import LoginBlockDiv from '@/app/components/temp/LoginBlockDiv';

interface NewsItems {
    item: {
        createdDate: number;
        des: string;
        images: Array<string>;
        pin: number;
        report: number;
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

const NewsSingleView = () => {
    const { id } = useParams();

    const [newsList, setNewsList] = useState<NewsItems[]>([]);
    const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);

    useEffect(() => {
        const loadNews = async (num: number) => {
            await fetch(`/api/posts/news/single/` + id)
                .then(response => response.json())
                .then(data => {

                    if (data.code === 1) {

                        setNewsList((prevData) => [...prevData, ...data.data]);

                        if (data.data.length > 0) {

                            //Create Image Circular linked list array
                            const arr = data.data;

                            const doublyLinkedLists: DoublyCircularLinkedList[] = [];
                            arr.forEach((ele: NewsItems) => {
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
                    console.error('Fetch error', error);
                })
        }
        loadNews(1);
        return () => { };
    }, [id]);

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

            <LoginBlockDiv></LoginBlockDiv>

            <BlogAppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3>
                                        <i className="fa-solid fa-circle-info icon-list"></i> News
                                    </h3>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>

                        {
                            newsList.map((ele, index) => (

                                <NewsPost
                                    key={index}
                                    imgState={imgState || 0}
                                    index={index}
                                    imgUrl={imgUrl || ''}
                                    images={ele.item.images}
                                    createdDate={ele.item.createdDate}
                                    doublyLinkedLists={doublyLinkedLists}
                                    getPrevImg={getPrevImg(index)}
                                    getNextImg={getNextImg(index)}
                                    id={ele.item._id}
                                    title={ele.item.title}
                                    des={ele.item.des}
                                    profilePic={ele.user.profilePic}
                                    firstName={ele.user.firstName}
                                    lastName={ele.user.lastName}
                                />
                            ))
                        }



                    </div>
                }
            ></BlogAppContent>


        </>
    )
}

export default NewsSingleView
"use client"
import BlogAppContent from '@/app/components/pages/blogs/BlogAppContent'
import NewsPost from '@/app/components/pages/posts/news/NewsPost'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import {Helmet} from 'react-helmet'

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

const Page = ({ }) => {
    const { id,title,des,img } = useParams();
    const imgClear = decodeURIComponent(img.toString())
    const imgStorageUrl = 'https://storage.googleapis.com/localnii-production/' + imgClear.replace(/[{}]/g,'')

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
            <Helmet>
                <title>{decodeURIComponent(title.toString())}</title>
                <meta name="description" content={decodeURIComponent(des.toString())} />
                {/* Favicon */}
                <link rel="icon" href={imgStorageUrl} />

                {/* Apple Touch Icon (iOS) */}
                <link rel="apple-touch-icon" sizes="180x180" href={imgStorageUrl} />

                {/* Facebook Open Graph Tags */}
                {/* <meta property="og:url" content="https://localnii.com" /> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={decodeURIComponent(title.toString())} />
                <meta property="og:description" content={decodeURIComponent(des.toString())} />
                <meta property="og:image" content={`https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg`} />
                <meta property="og:image:alt" content={decodeURIComponent(title.toString())} />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                {/* <meta name="twitter:site" content="@yourTwitterHandle" /> */}
                <meta name="twitter:title" content={decodeURIComponent(title.toString())} />
                <meta name="twitter:description" content={decodeURIComponent(des.toString())} />
                <meta name="twitter:image" content={imgStorageUrl} />
            </Helmet>
            <BlogAppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-circle-info icon-list"></i> News</h3>
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

export default Page
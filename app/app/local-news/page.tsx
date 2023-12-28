"use client"
import NewsPost from '@/app/components/pages/posts/news/NewsPost';
import ButtonLoading from '@/app/components/temp/ButtonLoading';
import AppContent from '@/app/components/templates/AppContent'
import seenUpdate from '@/app/customlib/seenUpdate';
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

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

const LocalNews = () => {
    const [newsList, setNewsList] = useState<NewsItems[]>([]);
    const [pin, setPin] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [notFound, setNotFound] = useState<boolean>(true);
    const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);
    const [infinityLod, setInfinityLoad] = useState<boolean>(true)
    const [pNum, setPnum] = useState<number>(1);

    const loadNews = (num: number) => {
        setInfinityLoad(false)
        fetch(`/api/posts/news/all/${num}/0/`)
            .then(response => response.json())
            .then(data => {
                setPin(data.pin)


                if (data.code === 1) {

                    console.log(data.data)

                    setNewsList((prevData) => [...prevData, ...data.data]);
                    setTotal((prevData) => prevData + data.data.length);
                    // setPnum((prev) => prev + 1)

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
            .catch(error => {
                console.error('Fetch error', error);
            })
    }


    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadNews(pNum);
                setPnum((prev) => prev + 1)
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
        const loadNewsOnload = (num: number) => {
            setInfinityLoad(false)
            fetch(`/api/posts/news/all/${num}/0/`)
                .then(response => response.json())
                .then(data => {
                    setPin(data.pin)


                    if (data.code === 1) {

                        console.log(data.data)

                        setNewsList(data.data);
                        setTotal(data.data.length);
                        // setPnum((prev) => prev + 1)

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
                            setDoublyLinkedLists(doublyLinkedLists)

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
                .catch(error => {
                    console.error('Fetch error', error);
                })
        }
        loadNewsOnload(1);
        return () => {};
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
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-clipboard-list icon-list"></i> Local News ({total})</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>{pin} <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        {notFound ? (
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

                        <br/><br/><br/><br/>

                    </div>
                }
                rightBar={
                    ``
                }
            />
        </>
    )
}

export default LocalNews
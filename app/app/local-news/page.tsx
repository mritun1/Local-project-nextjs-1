"use client"
import MoreBtn from '@/app/components/buttons/MoreBtn'
import ButtonLoading from '@/app/components/temp/ButtonLoading';
import AppContent from '@/app/components/templates/AppContent'
import seenUpdate from '@/app/customlib/seenUpdate';
import customDate from '@/app/lib/customDate';
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import { error } from 'console';
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
    };
}

const LocalNews = () => {
    const [newsList, setNewsList] = useState<NewsItems[]>([]);
    const newDate = new customDate();
    const [pin, setPin] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [notFound, setNotFound] = useState<boolean>(true);
    const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);
    const [infinityLod, setInfinityLoad] = useState<boolean>(true)
    const [pNum, setPnum] = useState<number>(1);

    const loadNews = (num: number) => {
        setInfinityLoad(false)
        fetch(`/api/posts/news/all/${num}/0/`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache, no-store',
            },
        })
            .then(response => response.json())
            .then(data => {
                setPin(data.pin)


                if (data.code === 1) {

                    console.log(data.data)

                    setNewsList((prevData) => [...prevData, ...data.data]);
                    setTotal((prevData) => prevData + data.data.length);
                    setPnum((prev) => prev + 1)

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
        loadNews(1);
        return () => {
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
                                <div key={index} className="offer_post" style={{ height: `580px` }}>

                                    <div className="product">

                                        <div className="product_news">
                                            <div className="news_date" >
                                                <div>
                                                    <h3 ><span className="date">Date:</span> {newDate.millisecondToString("dmy", ele.item.createdDate)}</h3>
                                                </div>

                                                <div className="more_btn" >

                                                    <MoreBtn>
                                                        <li><i className="fa-solid fa-floppy-disk"></i> Save</li>
                                                        <li><i className="fa-regular fa-flag"></i> Report</li>
                                                        <li><i className="fa-solid fa-rectangle-ad"></i> Promote</li>
                                                        <li><i className="fa-solid fa-share"></i> Share</li>
                                                    </MoreBtn>
                                                </div>

                                            </div>
                                            <div className="product_images">
                                                <div className="news_img_sec"
                                                    style={{
                                                        backgroundImage: `url(${imgState === index ? imgUrl :
                                                            ele.item.images[0]
                                                            })`
                                                    }}
                                                >
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
                                                    <p>{ele.item.des}</p>
                                                </div>
                                                <div>
                                                    <button>read more...</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="store">
                                        <div className="store_profile">
                                            <div>
                                                <div style={{ backgroundImage: `url(https://img.etimg.com/thumb/width-1200,height-900,imgsize-552986,resizemode-75,msid-98507873/small-biz/sme-sector/from-ambani-to-adani-why-billionaires-have-not-been-able-to-break-the-stronghold-of-kirana-stores-in-india.jpg)` }} className="img"></div>
                                            </div>
                                            <div>
                                                <div>
                                                    <a href="">
                                                        <h5>{ele.user.firstName} {ele.user.lastName}</h5>
                                                    </a>
                                                </div>
                                            </div>
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
                        >.</ButtonLoading>

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
"use client"
import SecondHandPublicPost from '@/app/components/pages/secondhand/SecondHandPublicPost';
import ButtonLoading from '@/app/components/temp/ButtonLoading';
import AppContent from '@/app/components/templates/AppContent'
import seenUpdate from '@/app/customlib/seenUpdate';
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import goBack from '@/app/lib/goBack';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface Contents {
    item: {
        _id: string;
        contact1: number;
        contact2: number;
        createdDate: number;
        images: Array<string>;
        productCategory: string;
        productDes: string;
        productName: string;
        productOld: string;
        productPin: number;
        productPrice: number;
        userId: string;
    };
    user: {
        firstName: string;
        profilePic: string;
    };
}
const LocalSecondHandCat = () => {

    const router = useParams()
    const { slug } = router

    const [contents, setContents] = useState<Contents[]>([]);
    const [pin, setPin] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [notFound, setNotFound] = useState<boolean>(true);
    const [infinityLod, setInfinityLoad] = useState<boolean>(true)
    const [pNum, setPnum] = useState<number>(1);
    const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);

    const loadNews = (num: number, slug:any) => {
        setInfinityLoad(false)
        fetch(`/api/products/second-hand/public/${slug}/${num}/0/`, {
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

                    setContents((prevData) => [...prevData, ...data.data]);
                    setTotal((prevData) => prevData + data.data.length);
                    setPnum((prev) => prev + 1)

                    if (data.data.length > 0) {

                        //Create Image Circular linked list array
                        const arr = data.data;

                        const doublyLinkedLists: DoublyCircularLinkedList[] = [];
                        arr.forEach((ele: Contents) => {
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
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadNews(pNum, slug);
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
    }, [pNum, slug]);

    
    const pathname = usePathname();

    useEffect(() => {
        const seenUpdater = new seenUpdate();
        seenUpdater.update(pathname);
        return () => {};
    }, [pathname]);

    const [backUrl, setBackUrl] = useState<string>("/");
    useEffect(() => {
        const getBackFunc = new goBack();
        loadNews(1,slug);
        setBackUrl(getBackFunc.getUrl())
        return () => {};
    }, [slug]);

    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-tag"></i> {slug} ({total})</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>{pin} <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>


                        {notFound ? (
                            <div className="columns_two_product">
                                {contents.map((ele, index) => (

                                    <SecondHandPublicPost 
                                        key={index}
                                        index={index}
                                        images={ele.item.images}
                                        doublyLinkedLists={doublyLinkedLists}
                                        profilePic={ele.user.profilePic}
                                        firstName={ele.user.firstName}
                                        productPin={ele.item.productPin}
                                        productName={ele.item.productName}
                                        productPrice={ele.item.productPrice}
                                        productOld={ele.item.productOld}
                                        productDes={ele.item.productDes}
                                        contact1={ele.item.contact1}
                                        contact2={ele.item.contact2}
                                        id={ele.item._id}
                                    />

                                    
                                ))}

                            </div>

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
                }
                rightBar={
                    <div className="cat_right">

                        <div className="cat_title">
                            <div>
                                <Link href={backUrl} as={backUrl} >
                                    <div><div><i className="fa-solid fa-left-long"></i></div></div>
                                </Link>
                            </div>
                            <div>
                                <div><h5>Other Categories</h5></div>
                            </div>
                        </div>

                        <div className="cat_list">

                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Bycycle <button>23</button></h5>
                                </a>
                            </div>

                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Cars <button>23</button></h5>
                                </a>
                            </div>
                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Mobile phone <button>23</button></h5>
                                </a>
                            </div>
                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Laptops <button>23</button></h5>
                                </a>
                            </div>
                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Banglow <button>23</button></h5>
                                </a>
                            </div>

                        </div>

                    </div>
                }
            ></AppContent>


        </>
    )
}

export default LocalSecondHandCat
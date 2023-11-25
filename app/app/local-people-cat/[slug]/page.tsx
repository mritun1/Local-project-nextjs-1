"use client"
import ButtonLoading from '@/app/components/temp/ButtonLoading';
import AppContent from '@/app/components/templates/AppContent'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import goBack from '@/app/lib/goBack';
import { useParams } from 'next/navigation';
import PeoplesBtn from '@/app/components/pages/people/PeoplesBtn';

interface UserItems {
    _id: string;
    firstName: string;
    lastName: string;
    pinCode: number;
    gender: string;
    profession: string;
    mobile: number;
    createdDate: string;
    updatedDate: string;
    profilePic: string;
}

const LocalPeopleView = () => {
    const router = useParams()
    const {slug} = router
    
    const [peopleList, setPeopleLists] = useState<UserItems[]>([]);
    const [pin, setPin] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [notFound, setNotFound] = useState<boolean>(true);
    const [infinityLod, setInfinityLoad] = useState<boolean>(true)
    const [pNum, setPnum] = useState<number>(1);
    
    

    useEffect(() => {

        const loadPeople = (num: number) => {
            setInfinityLoad(false)
            const res = fetch(`/api/people/${slug}/${num}/0/`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    setPin(data.pin)
                    if (data.code === 1) {
                        console.log(data.data)
                        setPeopleLists((prevData) => [...prevData, ...data.data]);
                        setTotal((prevData) => prevData + data.data.length);
                        setPnum((prev) => prev + 1)
                        setNotFound(true)
                        setInfinityLoad(true)
                    } else {
                        setInfinityLoad(true)
                        //setNotFound(false)
                    }
                })
        }

        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadPeople(pNum);
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
    }, [pNum,slug]);

    const [backUrl, setBackUrl] = useState<string>("/");
    useEffect(() => {
        const getBackFunc = new goBack();
        setBackUrl(getBackFunc.getUrl())
        return () => { };
    }, []);

    useEffect(() => {
        const loadPeople = (num: number) => {
            setInfinityLoad(false)
            const res = fetch(`/api/people/${slug}/${num}/0/`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    setPin(data.pin)
                    if (data.code === 1) {
                        console.log(data.data)
                        setPeopleLists((prevData) => [...prevData, ...data.data]);
                        setTotal((prevData) => prevData + data.data.length);
                        setPnum((prev) => prev + 1)
                        setNotFound(true)
                        setInfinityLoad(true)
                    } else {
                        setInfinityLoad(true)
                        //setNotFound(false)
                    }
                })
        }

        loadPeople(1);
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

                        {notFound?(
                            peopleList.map((ele,index)=>(
                                <div key={index} className="business">
                                    <div>
                                        <div className="business_img" style={{ backgroundImage: `url(${!ele.profilePic?'/icons/others/profile.webp':ele.profilePic})` }}></div>
                                    </div>
                                    <div>
                                        <div>
                                            <h3>{ele.firstName} {ele.lastName}</h3>
                                            <p><i className="fa-solid fa-location-dot"></i> {ele.pinCode} <button className="cat_text">{ele.profession}</button></p>
                                        </div>
                                        <PeoplesBtn 
                                        id={ele._id}
                                        ></PeoplesBtn>
                                    </div>
                                </div>
                            ))
                        ):(
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
                                <Link href="/app/local-people-cat">
                                    <h5>Software Engineer <button>23</button></h5>
                                </Link>
                            </div>

                            <div className="cat">
                                <Link href="/app/local-people-cat">
                                    <h5>Student <button>23</button></h5>
                                </Link>
                            </div>
                            <div className="cat">
                                <Link href="/app/local-people-cat">
                                    <h5>Dentist <button>23</button></h5>
                                </Link>
                            </div>
                            <div className="cat">
                                <Link href="/app/local-people-cat">
                                    <h5>Teacher <button>23</button></h5>
                                </Link>
                            </div>
                            <div className="cat">
                                <Link href="/app/local-people-cat">
                                    <h5>Electricians <button>23</button></h5>
                                </Link>
                            </div>

                        </div>

                    </div>
                }
            ></AppContent>


        </>
    )
}

export default LocalPeopleView
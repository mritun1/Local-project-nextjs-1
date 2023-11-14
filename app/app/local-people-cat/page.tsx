"use client"
import ButtonLoading from '@/app/components/temp/ButtonLoading';
import AppContent from '@/app/components/templates/AppContent'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import goBack from '@/app/lib/goBack';

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

const Page = () => {
    const [peopleList, setPeopleLists] = useState<UserItems[]>([]);
    const [pin, setPin] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [notFound, setNotFound] = useState<boolean>(true);
    const [infinityLod, setInfinityLoad] = useState<boolean>(true)
    const [pNum, setPnum] = useState<number>(1);

    const loadPeople = (num: number) => {
        setInfinityLoad(false)
        const res = fetch(`/api/people/all/${num}/0/`, {
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
                    setPeopleLists((prevData) => [...prevData, ...data.data]);
                    setTotal((prevData) => prevData + data.data.length);
                    setPnum((prev) => prev + 1)
                    setNotFound(true)
                    setInfinityLoad(true)
                } else {
                    setInfinityLoad(true)
                    setNotFound(false)
                }
            })
    }

    useEffect(() => {
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
    }, [pNum]);

    const getBackFunc = new goBack();
    
    const [backUrl,setBackUrl] = useState<string>("/");
    useEffect(() => {
        return () => {
            loadPeople(1);
            setBackUrl(getBackFunc.getUrl())
        };
    }, []);

    
    
    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-tag"></i> Software Engineers ({total})</h3>
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
                                        <div className="secondhand_btns">
                                            <div>
                                                <button><i className="fa-solid fa-ellipsis"></i></button>
                                                <p>More</p>
                                            </div>
                                            <div>
                                                <button><i className="fa-solid fa-phone-volume"></i></button>
                                                <p>Contact</p>
                                            </div>
                                            <div>
                                                <button><i className="fa-solid fa-floppy-disk"></i></button>
                                                <p>Save</p>
                                            </div>
                                        </div>
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
                        >Not found</ButtonLoading>

                        {/* <div className="business">
                            <div>
                                <div className="business_img" style={{ backgroundImage: `url(https://cdn.britannica.com/45/223045-050-A6453D5D/Telsa-CEO-Elon-Musk-2014.jpg)` }}></div>
                            </div>
                            <div>
                                <div>
                                    <h3>Mritunjoy Mushahary</h3>
                                    <p><i className="fa-solid fa-location-dot"></i> 783360 <button className="cat_text">Software Engineer</button></p>
                                </div>
                                <div className="secondhand_btns">
                                    <div>
                                        <button><i className="fa-solid fa-ellipsis"></i></button>
                                        <p>More</p>
                                    </div>
                                    <div>
                                        <button><i className="fa-solid fa-phone-volume"></i></button>
                                        <p>Contact</p>
                                    </div>
                                    <div>
                                        <button><i className="fa-solid fa-floppy-disk"></i></button>
                                        <p>Save</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="business">
                            <div>
                                <div className="business_img" style={{ backgroundImage: `url(https://cdn.britannica.com/45/223045-050-A6453D5D/Telsa-CEO-Elon-Musk-2014.jpg)` }}></div>
                            </div>
                            <div>
                                <div>
                                    <h3>Mritunjoy Mushahary</h3>
                                    <p><i className="fa-solid fa-location-dot"></i> 783360 <button className="cat_text">Software Engineer</button></p>
                                </div>
                                <div className="secondhand_btns">
                                    <div>
                                        <button><i className="fa-solid fa-ellipsis"></i></button>
                                        <p>More</p>
                                    </div>
                                    <div>
                                        <button><i className="fa-solid fa-phone-volume"></i></button>
                                        <p>Contact</p>
                                    </div>
                                    <div>
                                        <button><i className="fa-solid fa-floppy-disk"></i></button>
                                        <p>Save</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="business">
                            <div>
                                <div className="business_img" style={{ backgroundImage: `url(https://cdn.britannica.com/45/223045-050-A6453D5D/Telsa-CEO-Elon-Musk-2014.jpg)` }}></div>
                            </div>
                            <div>
                                <div>
                                    <h3>Mritunjoy Mushahary</h3>
                                    <p><i className="fa-solid fa-location-dot"></i> 783360 <button className="cat_text">Software Engineer</button></p>
                                </div>
                                <div className="secondhand_btns">
                                    <div>
                                        <button><i className="fa-solid fa-ellipsis"></i></button>
                                        <p>More</p>
                                    </div>
                                    <div>
                                        <button><i className="fa-solid fa-phone-volume"></i></button>
                                        <p>Contact</p>
                                    </div>
                                    <div>
                                        <button><i className="fa-solid fa-floppy-disk"></i></button>
                                        <p>Save</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}


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

export default Page
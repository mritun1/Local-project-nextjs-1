"use client"
import LoginBlockDiv from '@/app/components/temp/LoginBlockDiv'
import React, { useEffect, useState } from 'react'
import BlogAppContent from '../../blogs/BlogAppContent'
import PeoplesBtn from '../../people/PeoplesBtn'
import { useParams } from 'next/navigation'
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
const PeopleSingleView = () => {
    const { id } = useParams();
    const [peopleList, setPeopleLists] = useState<UserItems[]>([]);
    useEffect(() => {

        const loadPeople = (num: number) => {
            const res = fetch(`/api/people/single/${id}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 1) {
                        setPeopleLists((prevData) => [...prevData, ...data.data]);
                    } 
                })
        }

        loadPeople(1);

        // Remove the event listener when the component unmounts
        return () => {};
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
                                    <h3>
                                        <i className="fa-solid fa-circle-info icon-list"></i> People
                                    </h3>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>

                        {peopleList.map((ele, index) => (
                            <div key={index} className="business">
                                <div>
                                    <div className="business_img" style={{ backgroundImage: `url(${!ele.profilePic ? '/icons/others/profile.webp' : ele.profilePic})` }}></div>
                                </div>
                                <div>
                                    <div>
                                        <h3>{ele.firstName} {ele.lastName}</h3>
                                        <p><i className="fa-solid fa-location-dot"></i> {ele.pinCode} <button className="cat_text">{ele.profession}</button></p>
                                    </div>
                                    <PeoplesBtn
                                        id={ele._id}
                                        name={ele.firstName + ' ' + ele.lastName}
                                    ></PeoplesBtn>
                                </div>
                            </div>
                        ))}

                    </div>
                }
            ></BlogAppContent>
        </>
    )
}

export default PeopleSingleView
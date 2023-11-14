"use client"
import CreatePost from '@/app/components/pages/posts/CreatePost'
import EditPost from '@/app/components/pages/posts/EditPost';
import AppContent from '@/app/components/templates/AppContent'
import Loading from '@/app/components/templates/Loading';
import customDate from '@/app/lib/customDate';
import React, { useEffect, useState } from 'react'

interface Posts {
    _doc: {
        _id: string;
        title: string;
        des: string;
        pin: number;
        userId: string;
        images: string[];
        createdDate: number;
        __v: number;
    };
    postType: string;
}

const Page = () => {

    const [postLists, setPostLists] = useState<Posts[]>([]);
    const [notFound,setNotFound] = useState<boolean>(false);
    const [load,setLoad] = useState<boolean>(false);
    const theDate:any = new customDate();
    const [total, setTotal] = useState<number>(0);
    const [approved, setApproved] = useState<number>(0);
    const [pin, setPin] = useState<number>(0);

    //LOAD ITEMS FROM BACKEND
    
    const loadContents = async () => {
        setLoad(true);
        const res = await fetch("/api/posts/admin/lists/");
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            setPostLists(data.data);
            if (data.data !== undefined && data.data.length > 0) {
                setNotFound(true);
            }
            setTotal(data.total);
            setPin(data.pin)
            setApproved(data.approved);
        } else {
            console.log("Fetching error");
        }
        setLoad(false);
    };
    
    //EXECUTE WHILE PAGE LOAD
    useEffect(()=>{
        loadContents();
    }, [])

    return (
        <>
            {load?(
                <Loading></Loading>
            ):('')}

            <AppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-newspaper icon-list"></i> My Posts</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>{pin} <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        

                        <CreatePost
                        loadCont={loadContents}
                        ></CreatePost>


                        <div className="tab_menu">
                            <div>
                                <h3>{total}</h3>
                                <p>Total</p>
                            </div>
                            <div>
                                <h3>{approved}</h3>
                                <p>Approved</p>
                            </div>
                            <div>
                                <h3>0</h3>
                                <p>Rejected</p>
                            </div>
                            <div>
                                <h3>0</h3>
                                <p>Reported</p>
                            </div>
                        </div>

                        {notFound?(
                            postLists.map((ele, index) => (
                                <div key={index} className="post_box">
                                    <div>
                                        <div>
                                            <p>{theDate.millisecondToString('dmy', ele._doc.createdDate)} </p>
                                        </div>
                                        <div>
                                            <button>Approved</button>
                                        </div>
                                    </div>
                                    <div>
                                        <h4>{ele._doc.title}</h4>
                                    </div>
                                    <div>
                                        <div>
                                            <p>{ele.postType}</p>
                                        </div>
                                        <div>
                                            <EditPost
                                                postType={ele.postType}
                                                postId={ele._doc._id}
                                                loadCont={loadContents}
                                            ></EditPost>
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


                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default Page
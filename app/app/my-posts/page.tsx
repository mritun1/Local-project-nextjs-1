"use client"
import CreatePost from '@/app/components/pages/posts/CreatePost'
import AppContent from '@/app/components/templates/AppContent'
import React, { useEffect } from 'react'

const Page = () => {

    // //LOAD ITEMS FROM BACKEND
    // const loadContents = async() =>{
    //     const res = await fetch("/api/posts/admin/lists/")
    //     if(res.ok){
    //         const data = await res.json()
    //         console.log(data.data)
    //     }else{
    //         console.log("Fetching error")
    //     }
    // }
    // //EXECUTE WHILE PAGE LOAD
    // useEffect(()=>{
    //     //loadContents()
    // })

    return (
        <>

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
                                    <h4>78336 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        

                        <CreatePost></CreatePost>


                        <div className="tab_menu">
                            <div>
                                <h3>34</h3>
                                <p>Total</p>
                            </div>
                            <div>
                                <h3>34</h3>
                                <p>Approved</p>
                            </div>
                            <div>
                                <h3>34</h3>
                                <p>Rejected</p>
                            </div>
                            <div>
                                <h3>34</h3>
                                <p>Reported</p>
                            </div>
                        </div>

                        <div className="post_box">
                            <div>
                                <div>
                                    <p>20 Jan,23</p>
                                </div>
                                <div>
                                    <button>Approved</button>
                                </div>
                            </div>
                            <div>
                                <h4>This is the name of the world</h4>
                            </div>
                            <div>
                                <div>
                                    <p>Post</p>
                                </div>
                                <div>
                                    <button className="edit"><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                                    <button className="del"><i className="fa-solid fa-trash"></i> Delete</button>
                                    <button className="view"><i className="fa-solid fa-eye"></i> preview</button>
                                </div>
                            </div>
                        </div>

                        <div className="post_box">
                            <div>
                                <div>
                                    <p>20 Jan,23</p>
                                </div>
                                <div>
                                    <button>Approved</button>
                                </div>
                            </div>
                            <div>
                                <h4>This is the name of the world</h4>
                            </div>
                            <div>
                                <div>
                                    <p>Post</p>
                                </div>
                                <div>
                                    <button className="edit"><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                                    <button className="del"><i className="fa-solid fa-trash"></i> Delete</button>
                                    <button className="view"><i className="fa-solid fa-eye"></i> preview</button>
                                </div>
                            </div>
                        </div>

                        <div className="post_box">
                            <div>
                                <div>
                                    <p>20 Jan,23</p>
                                </div>
                                <div>
                                    <button>Approved</button>
                                </div>
                            </div>
                            <div>
                                <h4>This is the name of the world</h4>
                            </div>
                            <div>
                                <div>
                                    <p>Post</p>
                                </div>
                                <div>
                                    <button className="edit"><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                                    <button className="del"><i className="fa-solid fa-trash"></i> Delete</button>
                                    <button className="view"><i className="fa-solid fa-eye"></i> preview</button>
                                </div>
                            </div>
                        </div>



                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default Page
import AppContent from '@/app/components/templates/AppContent'
import React from 'react'

const page = () => {
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

                        <div className="post_create_btns">
                            <div>
                                <div>
                                    <h5>Add Local News</h5>
                                    <button><i className="fa-solid fa-plus"></i> Create Post</button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h5>Add Events</h5>
                                    <button><i className="fa-solid fa-plus"></i> Create Events</button>
                                </div>
                            </div>
                        </div>


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

export default page
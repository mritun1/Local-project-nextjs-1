import MoreBtn from '@/app/components/buttons/MoreBtn'
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
                                    <h3><i className="fa-solid fa-store icon-list"></i> My Stores</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>78336 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        <div className="alert">
                            <div>
                                <h5><button>1</button> Delivery Boy request pending...</h5>
                            </div>
                            <div>
                                <div>
                                    <button><i className="fa-solid fa-right-long"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="profile_sec">
                            <div >
                                <div className="center_profile">
                                    <div>
                                        <div style={{ backgroundImage: `url(https://newslivetv.com/wp-content/uploads/2020/06/grocery-shopsss.jpg)` }}></div>
                                    </div>
                                    <div>
                                        <div>
                                            <h3>Justin Electric store</h3>
                                        </div>
                                        <div>

                                            <label className="online_offline">
                                                <input type="checkbox" defaultChecked={true} />
                                                <span className="slider round"></span>
                                            </label>

                                            <button style={{ backgroundColor: `green`, color: `white` }}>store open</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div>
                                    <button>Delivery Boy (1)</button>
                                </div>
                                <div>

                                    <div className="more_btn">
                                        783360
                                        
                                        <MoreBtn>
                                            <li><i className="fa-solid fa-pen-to-square"></i> Edit</li>
                                            <li><i className="fa-solid fa-rectangle-ad"></i> Promote</li>
                                            <li><i className="fa-solid fa-share"></i> Share</li>
                                        </MoreBtn>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="create_bar">
                            <div>
                                <div><button><i className="fa-solid fa-plus"></i></button>
                                    Create</div>
                            </div>
                            <div>
                                <div><h5>4</h5></div>
                            </div>
                        </div>


                        <div className="post_box">
                            <div>
                                <div>
                                    <p>20 Jan,23</p>
                                </div>
                                <div>
                                    <button>Sold</button>
                                </div>
                            </div>
                            <div>
                                <h4>New Brand Mobile 50% off</h4>
                            </div>
                            <div>
                                <div>
                                    <p>Offers</p>
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
                                    <button>Sold</button>
                                </div>
                            </div>
                            <div>
                                <h4>New Brand Mobile 50% off</h4>
                            </div>
                            <div>
                                <div>
                                    <p>Offers</p>
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
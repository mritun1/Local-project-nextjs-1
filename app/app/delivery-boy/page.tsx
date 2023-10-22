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
                                    <h3><i className="fa-solid fa-store icon-list"></i> Delivery Boy</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>78336 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        <div className="profile_sec">
                            <div >
                                <div className="center_profile">
                                    <div>
                                        <div style={{ backgroundImage: `url(https://img.freepik.com/free-photo/food-delivery-boy-driving-scooter-with-box-with-food-wearing-mask_1303-27713.jpg)` }}></div>
                                    </div>
                                    <div>
                                        <div>
                                            <h3>Mritunjoy Mushahary</h3>
                                        </div>
                                        <div>

                                            <label className="online_offline">
                                                <input type="checkbox" checked />
                                                <span className="slider round"></span>
                                            </label>

                                            <button style={{ backgroundColor: `green`, color: `white` }}>active</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div>
                                    <button>My Stores (1)</button>
                                </div>
                                <div>

                                    <div className="more_btn">
                                        783360
                                        
                                        <MoreBtn>
                                            <li><i className="fa-solid fa-pen-to-square"></i> Edit</li>
                                        </MoreBtn>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="create_bar">
                            <div>
                                <div style={{ width: `160px` }}><button><i className="fa-solid fa-plus"></i></button>
                                    Request Store</div>
                            </div>
                            <div>
                                <div><h5>4</h5></div>
                            </div>
                        </div>


                        <div className="my_store_list">
                            <div className="center_profile">
                                <div>
                                    <div style={{ backgroundImage: `url(https://cdn.britannica.com/16/204716-050-8BB76BE8/Walmart-store-Mountain-View-California.jpg)` }}></div>
                                </div>
                                <div>
                                    <div>
                                        <h3>Sharema store</h3>
                                    </div>
                                    <div>
                                        <button style={{ backgroundColor: `green`, color: `white` }}>Store opened</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button>Details</button>
                            </div>
                        </div>

                        <div className="my_store_list">
                            <div className="center_profile">
                                <div>
                                    <div style={{ backgroundImage: `url(https://cdn.britannica.com/16/204716-050-8BB76BE8/Walmart-store-Mountain-View-California.jpg)` }}></div>
                                </div>
                                <div>
                                    <div>
                                        <h3>Sharema store</h3>
                                    </div>
                                    <div>
                                        <button style={{ backgroundColor: `green`, color: `white` }}>Store opened</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button>Details</button>
                            </div>
                        </div>

                        <div className="my_store_list">
                            <div className="center_profile">
                                <div>
                                    <div style={{ backgroundImage: `url(https://cdn.britannica.com/16/204716-050-8BB76BE8/Walmart-store-Mountain-View-California.jpg)` }}></div>
                                </div>
                                <div>
                                    <div>
                                        <h3>Sharema store</h3>
                                    </div>
                                    <div>
                                        <button style={{ backgroundColor: `green`, color: `white` }}>Store opened</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button>Details</button>
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
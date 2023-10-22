import AppContent from '@/app/components/templates/AppContent'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-tag"></i> Software Engineers (35)</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>78336 <button><i className="fa-solid fa-location-dot"></i></button></h4>
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


                    </div>
                }
                rightBar={
                    <div className="cat_right">

                        <div className="cat_title">
                            <div>
                                <a href="/local-people">
                                    <div><div><i className="fa-solid fa-left-long"></i></div></div>
                                </a>
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

export default page
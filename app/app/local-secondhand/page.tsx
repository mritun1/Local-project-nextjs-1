"use client"
import AppContent from '@/app/components/templates/AppContent'
import seenUpdate from '@/app/customlib/seenUpdate';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {

    const seenUpdater = new seenUpdate();
    const pathname = usePathname();

    useEffect(() => {
        return () => {
            seenUpdater.update(pathname);
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
                                    <h3><i className="fa-solid fa-tag"></i> Secondhand (0)</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>0 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        <div className="service-not-available">
                            <div>
                                <h2><i className="fa-regular fa-hourglass-half"></i></h2>
                                <h3>Coming Soon! Please wait for some more days.</h3>
                                <h1>Thank You.</h1>
                            </div>
                        </div>


                    </div>
                }
                rightBar={
                    <div className="cat_right">

                        <div className="cat_title">
                            <div>
                                <a href="/local-market">
                                    <div><div><i className="fa-solid fa-left-long"></i></div></div>
                                </a>
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

export default Page
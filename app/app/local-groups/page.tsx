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
                                    <h3><i className="fa-solid fa-tag"></i> Groups (0)</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>0 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        <div className="tab-menu groups">
                            <div className='active'>
                                <h3>Home</h3>
                            </div>
                            <div>
                                <h3>Search</h3>
                            </div>
                            <div>
                                <h3>+Add</h3>
                            </div>
                        </div>

                        <div className="groups-content">

                            <div className="bar_btn_box">
                                <div>
                                    <div>
                                        <div
                                            className='avatar-bg'
                                            style={{
                                                backgroundImage: `url(/icons/others/profile.webp)`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className='msg-list'>
                                        <h5>James Bond <button className='badge bg-red'>3</button></h5>
                                        <p><b>Mritun:</b> sdf sdf sdf ...</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='join'>
                                        <button >
                                            <i className="fa-solid fa-plus"></i> Join
                                        </button>
                                        <p className='small text-center'>345+</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bar_btn_box">
                                <div>
                                    <div>
                                        <div
                                            className='avatar-bg'
                                            style={{
                                                backgroundImage: `url(/icons/others/profile.webp)`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className='msg-list'>
                                        <h5>James Bond <button className='badge bg-red'>3</button></h5>
                                        <p><b>Mritun:</b> sdf sdf sdf ...</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='join'>
                                        <button >
                                            <i className="fa-solid fa-plus"></i> Join
                                        </button>
                                        <p className='small text-center'>345+</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bar_btn_box">
                                <div>
                                    <div>
                                        <div
                                            className='avatar-bg'
                                            style={{
                                                backgroundImage: `url(/icons/others/profile.webp)`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className='msg-list'>
                                        <h5>James Bond <button className='badge bg-red'>3</button></h5>
                                        <p><b>Mritun:</b> sdf sdf sdf ...</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='join'>
                                        <button >
                                            <i className="fa-solid fa-plus"></i> Join
                                        </button>
                                        <p className='small text-center'>345+</p>
                                    </div>
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
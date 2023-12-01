"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import goBack from '@/app/lib/goBack'

type templateType = {
    mainContent: any,
    rightBar: any
}

const AppContent = (props: templateType) => {
    const pathname = usePathname();

    useEffect(()=>{
        const goBackFunc = new goBack();
        goBackFunc.setHistory(pathname);
        return ()=>{}
    }, [pathname])

    return (
        <>
            <div className="col_center">

                {props.mainContent}

            </div>
            <div className="col_right">

                <div>

                    <div className="search_box">
                        <div>
                            <div>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <div>
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div>

                    {props.rightBar}

                    <div className="left_menu">
                        <ul className="vertical_list">
                            {/* <a href="" className="link_color2">
                                <li><i className="fa-regular fa-rectangle-list icon-list"></i> My Orders <span className="level">0</span></li>
                            </a>
                            <a href="/my-business-contacts" className="link_color2">
                                <li><i className="fa-regular fa-id-card icon-list"></i> My Business Contacts <span className="level">0</span></li>
                            </a> */}
                            <a href="/app/my-contacts" className="link_color2">
                                <li><i className="fa-solid fa-address-book icon-list"></i> My Contacts <span className="level">0</span></li>
                            </a>
                            <a href="/app/my-saved" className="link_color2">
                                <li><i className="fa-solid fa-floppy-disk icon-list"></i> My Saved <span className="level">0</span></li>
                            </a>
                            
                            
                        </ul>
                    </div>

                    <div className="left_menu" style={{ border: `none` }}>
                        <ul className="vertical_list">
                            <Link href="/app/profile" className="link_color">
                                <li className={pathname === '/app/profile' ? 'active' : ''} ><i className="fa-solid fa-id-badge icon-list"></i> Profile</li>
                            </Link>
                            <Link href="/app/settings" className="link_color">
                                <li className={pathname === '/app/settings' ? 'active' : ''} ><i className="fa-solid fa-gear icon-list"></i> Settings</li>
                            </Link>
                            {/* <Link href="/my-analytics" className="link_color2">
                                <li><i className="fa-solid fa-chart-simple icon-list"></i> My Analytics</li>
                            </Link> */}
                        </ul>
                    </div>

                    <div className="left_menu" style={{ borderBottom: `none` }}>
                        <ul className="vertical_list">
                            <a href="/app/pin-code-map" className="link_color2">
                                <li><i className="fa-solid fa-map icon-list"></i> PinCode Map</li>
                            </a>
                            <a href="/blogs/guides" className="link_color2">
                                <li><i className="fa-solid fa-book icon-list"></i> Guide & Helps</li>
                            </a>
                        </ul>
                    </div>

                </div>

            </div>
        </>
    )
}

export default AppContent
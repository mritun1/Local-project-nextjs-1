"use client"
import { usePathname } from 'next/navigation';
import React from 'react'

type templateType = {
    mainContent: any,
}

const BlogAppContent = (props: templateType) => {
    const pathname = usePathname();

    return (
        <>
            <div className="col_center">

                {props.mainContent}

            </div>
            <div className="col_right">

                <div className="title_bar">
                    <div>
                        <div>
                            <h3> Localnii</h3>
                        </div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div>

                <div>

                    <div className="left_menu">
                        <ul className="vertical_list">

                            <a href="/blogs/others/about-us" className="link_color2">
                                <li className={pathname === '/blogs/others/about-us' ? 'active' : ''}><i className="fa-solid fa-circle-info icon-list"></i> About us</li>
                            </a>

                            <a href="/blogs/others/terms-condition" className="link_color2">
                                <li className={pathname === '/blogs/others/terms-condition' ? 'active' : ''}><i className="fa-solid fa-square-check icon-list"></i> Terms & Conditions</li>
                            </a>

                            <a href="/blogs/others/return-policy" className="link_color2">
                                <li className={pathname === '/blogs/others/return-policy' ? 'active' : ''}><i className="fa-solid fa-address-book icon-list"></i> Return Policy</li>
                            </a>

                        </ul>
                    </div>

                </div>

            </div>
        </>
    )
}

export default BlogAppContent
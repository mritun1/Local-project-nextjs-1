"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import goBack from '@/app/lib/goBack'

type templateType = {
    mainContent: any,
}

const BlogAppContent = (props: templateType) => {
    
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

                            <a href="/app/my-groups" className="link_color2">
                                <li><i className="fa-solid fa-circle-info icon-list"></i> About us</li>
                            </a>

                            <a href="/app/my-groups" className="link_color2">
                                <li><i className="fa-solid fa-square-check icon-list"></i> Terms & Conditions</li>
                            </a>

                            <a href="/app/my-groups" className="link_color2">
                                <li><i className="fa-solid fa-address-book icon-list"></i> Contact us</li>
                            </a>

                            <a href="/app/my-groups" className="link_color2">
                                <li><i className="fa-solid fa-comment-dots icon-list"></i> Feedback</li>
                            </a>

                        </ul>
                    </div>

                </div>

            </div>
        </>
    )
}

export default BlogAppContent
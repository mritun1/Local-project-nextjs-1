"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BlogLeftMenu = () => {
    const pathname = usePathname();
    return (
        <>

            <div className="title_bar">
                <div>
                    <div>
                        <h3> Guides</h3>
                    </div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>

            <div className="left_menu" style={{ borderBottom: `none` }}>
                <ul className="vertical_list">

                    <Link href="/app/local-news" className="link_color">
                        <li
                            className={pathname === '/app/local-news' ? 'active' : ''}
                        ><i className="fa-solid fa-clipboard-list icon-list"></i> How to register? </li>
                    </Link>

                    <Link href="/app/local-news" className="link_color">
                        <li
                            className={pathname === '/app/local-news' ? 'active' : ''}
                        ><i className="fa-solid fa-clipboard-list icon-list"></i> How to Login? </li>
                    </Link>

                </ul>
            </div>

        </>
    )
}

export default BlogLeftMenu
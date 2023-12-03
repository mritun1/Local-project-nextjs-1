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
                        <h3> Social Account</h3>
                    </div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>

            <div className="left_menu" style={{ borderBottom: `none` }}>
                <ul className="vertical_list">

                    <Link href="https://www.youtube.com/playlist?list=PLDPoZsPYxSlyueW3hayaQHdG-ravAika-" target='_blank' className="link_color">
                        <li
                            className={pathname === '/app/local-news' ? 'active' : ''}
                        ><i className="fa-solid fa-clipboard-list icon-list"></i> 
                            YouTube
                        </li>
                    </Link>

                    <Link href="https://www.facebook.com/localnii/" target='_blank' className="link_color">
                        <li
                            className={pathname === '/app/local-news' ? 'active' : ''}
                        ><i className="fa-solid fa-clipboard-list icon-list"></i> 
                            Facebook
                        </li>
                    </Link>

                </ul>
            </div>

        </>
    )
}

export default BlogLeftMenu
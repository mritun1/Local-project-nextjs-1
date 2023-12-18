"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BlogLeftMenu = () => {
    const pathname = usePathname();
    return (
        <>

            <div className="left_menu" style={{ borderBottom: `none` }}>
                <h4 style={{ marginTop: `10px` }} className='text-color'>Go to</h4>
                <ul className="vertical_list">
                    <Link href="/app/local-news" className="link_color">
                        <li
                        ><i className="fa-solid fa-clipboard-list icon-list"></i> Local News </li>
                    </Link>
                    <Link href="/app/local-events" className="link_color">
                        <li ><i className="fa-regular fa-calendar icon-list"></i> Local Events </li>
                    </Link>
                    
                    <Link href="/app/local-secondhand" className="link_color">
                        <li ><i className="fa-solid fa-bag-shopping icon-list"></i> Local Secondhand </li>
                    </Link>
                    
                    <Link href="/app/local-groups" className="link_color">
                        <li ><i className="fa-solid fa-users-rectangle icon-list"></i> Local Groups </li>
                    </Link>
                    <Link href="/app/local-people" className="link_color">
                        <li ><i className="fa-solid fa-users icon-list"></i> Local People </li>
                    </Link>
                </ul>
            </div>

            <div className="left_menu" style={{ borderBottom: `none` }}>

                <h4 style={{ marginTop: `10px` }} className='text-color'>Social Accounts</h4>

                <ul style={{marginTop:`0px`}} className="vertical_list">

                    <Link href="https://www.youtube.com/playlist?list=PLDPoZsPYxSlyueW3hayaQHdG-ravAika-" target='_blank' className="link_color">
                        <li
                            className={pathname === '/app/local-news' ? 'active' : ''}
                        ><i className="fa-brands fa-youtube icon-list"></i> 
                            YouTube
                        </li>
                    </Link>

                    <Link href="https://www.facebook.com/localnii/" target='_blank' className="link_color">
                        <li
                            className={pathname === '/app/local-news' ? 'active' : ''}
                        ><i className="fa-brands fa-facebook icon-list"></i> 
                            Facebook
                        </li>
                    </Link>

                </ul>
            </div>

        </>
    )
}

export default BlogLeftMenu
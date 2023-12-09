"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BlogLeftMenu = () => {
    const pathname = usePathname();
    return (
        <>

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

            <div className="left_menu" style={{ borderBottom: `none` }}>

                <h4 style={{ marginTop: `10px` }} className='text-color'>Join Us</h4>

                <ul style={{ marginTop: `0px` }} className="vertical_list">

                    <Link href="/" target='_blank' className="link_color">
                        <li
                            className={pathname === '/app/local-news' ? 'active' : ''}
                        ><i className="fa-solid fa-user icon-list"></i>
                            Register/Login
                        </li>
                    </Link>

                </ul>
            </div>

        </>
    )
}

export default BlogLeftMenu
import BlogAppContent from '@/app/components/pages/blogs/BlogAppContent'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Guide - How to use Localnii',
    description: 'Here were the lists of some contents in Articles or Videos, which will tell you about Localnii usages.',
    icons: '/icons/logo/logo1.png'
}

const Page = () => {
    return (
        <>

            <BlogAppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-circle-info icon-list"></i> Guide & Help</h3>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>

                        <h2 className='text-color'>1. How to Sell Second Hand products on Localnii.com?</h2>

                        <center>
                            <iframe style={{ width: `96%`, height: `300px` }} src="https://www.youtube.com/embed/1gYRfd4mJWY" title="Selling my old Desktop (Computer) on Localnii.com" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>

                        </center>

                        <br/><br/>
                        <h2 className='text-color'>2. How to Install Localnii.com App on Android?</h2>

                        <iframe style={{ width: `96%`, height: `300px` }} src="https://www.youtube.com/embed/84OUQXXJ32U" title="Install localnii.com on mobile" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                    </div>
                }
            ></BlogAppContent>

        </>
    )
}

export default Page
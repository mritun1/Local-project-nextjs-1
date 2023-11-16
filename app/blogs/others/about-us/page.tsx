import BlogAppContent from '@/app/components/pages/blogs/BlogAppContent'
import React from 'react'
import Image from 'next/image'

const page = () => {
    return (
        <>

            <BlogAppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-circle-info icon-list"></i> About us</h3>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>

                        <center>
                            <Image 
                            alt="ya" 
                            src="/icons/logo/logo2.png" 
                            width={200}
                            height={120}
                            />
                        </center>

                        <p className='text-color2'>Localnii is the Hyper-local social commerce platform. Where you can share news, events and also find specific people.</p>

                        <p className='text-color2'></p>

                    </div>
                }
            ></BlogAppContent>

        </>
    )
}

export default page
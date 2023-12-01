"use client"
import MoreBtn from '@/app/components/buttons/MoreBtn'
import BlogAppContent from '@/app/components/pages/blogs/BlogAppContent'
import NewsDesMore from '@/app/components/pages/posts/news/NewsDesMore'
import PostOptions from '@/app/components/temp/PostOptions'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
interface NewsItems {
    item: {
        createdDate: number;
        des: string;
        images: Array<string>;
        pin: number;
        report: number;
        title: string;
        updatedDate: number;
        userId: string;
        _id: string;
    };
    user: {
        firstName: string;
        lastName: string;
        profilePic: string;
    };
}
const Page = () => {
    const { id } = useParams();
    
    
    useEffect(() => {
        const loadNews = () => {

            fetch(`/api/posts/news/${id}/`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache, no-store',
                },
            })
                .then(response => response.json())
                .then(data => {

                    if (data.code === 1) {

                        console.log(data.data)


                    }
                })
                .catch(error => {
                    console.error('Fetch error', error);
                })
        }
        loadNews();
        return () => { }
    }, [id])
    return (
        <>

            <BlogAppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-circle-info icon-list"></i> News</h3>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>

                        
                        


                    </div>
                }
            ></BlogAppContent>

        </>
    )
}

export default Page
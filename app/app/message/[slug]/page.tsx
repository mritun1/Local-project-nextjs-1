"use client"
import AppContent from '@/app/components/templates/AppContent'
import goBack from '@/app/lib/goBack';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'

const Page = () => {
    // const router = useRouter();
    // //OnClick Redirect
    // const redirect = (e: string) => {
    //     router.push(e)
    // }

    const {slug} = useParams();

    const getBackFunc = new goBack();
    const [backUrl, setBackUrl] = useState<string>("/");
    useEffect(() => {
        const getCont = async () =>{
            const res = await fetch("/api/message/draft/get/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mgsId: slug,
                })
            })
            if(res.ok){
                const data = await res.json()
                console.log(data)
                if(data.code===1){
                    setMessageText(data.data[0].content)
                }
            }
        }
        return () => {
            getCont();
            setBackUrl(getBackFunc.getUrl())
        };
    }, []);

    const [messageText, setMessageText] = useState<string>("")
    const draftChat = async (e: string) =>{
        setMessageText(e)
        const res = await fetch("/api/message/draft/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                mgsId:slug,
                content: messageText
            })
        })
    }
    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div className='display-flex'>
                                    <div
                                        className='avatar-bg'
                                        style={{ backgroundImage: `url(https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg)` }}
                                    ></div>
                                    <div>
                                        <h4 >
                                            <Link href="" className='text-color2'>
                                                James Bond
                                            </Link>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Link href={backUrl} as={backUrl} >
                                        <button className='btn_back green-btn' ><i className="fa-solid fa-left-long"></i></button>
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="chat-sec">

                            <div className='chat-content-sec'>

                                <div className='chat-left'>
                                    <div className="chat-content bg-dark-green">
                                        <p className='text-color2'>His this is the sender message</p>
                                    </div>
                                </div>

                                <div className='chat-right'>
                                    <div className="chat-content bg-light-green">
                                        <p className='text-color2'>Hi this is my message</p>
                                    </div>
                                </div>

                                <div className='chat-left'>
                                    <div className="chat-content bg-dark-green">
                                        <p className='text-color2'>His this is the sender message</p>
                                    </div>
                                </div>

                            </div>

                            <div className="chat-input-sec">
                                <div>
                                    <div><button><i className="fa-solid fa-plus"></i></button></div>
                                </div>
                                <div>
                                    <div>
                                        <input 
                                        onChange={(e)=>draftChat(e.target.value)} 
                                        value={messageText}
                                        type="text" 
                                        placeholder='Some text' 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div><button><i className="fa-solid fa-paper-plane"></i></button></div>
                                </div>
                            </div>

                        </div>


                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default Page
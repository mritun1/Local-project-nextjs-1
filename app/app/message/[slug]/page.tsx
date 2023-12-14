"use client"
import ChatContent from '@/app/components/pages/message/ChatContent';
import ChatOptionBtn from '@/app/components/pages/message/ChatOptionBtn';
import AppContent from '@/app/components/templates/AppContent'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, {  useEffect, useRef, useState } from 'react'

interface messageArr {
    ele:{
        content: string;
        createdDate: number;
        files: [];
        images: [];
        messageId: string;
        userId: string;
        videos: [];
    },
    uType:string
}

const LocalMessageChat = () => {

    const {slug} = useParams();
    const [senderName,setSenderName] = useState<string>("")
    const [senderPic,setSenderPic] = useState<string>("/icons/others/profile.webp")
    const [messageText, setMessageText] = useState<string>("")
    //ALWAYS SCROLL DOWN
    const chatContentRef = useRef<HTMLDivElement>(null);
    // Function to scroll to the bottom of the chat content
    const scrollToBottom = () => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    };

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
                if(data.code===1){
                    if (data.data && data.data[0] && data.data[0].content){
                        setMessageText(data.data[0].content)
                    }
                    setSenderName(data.user.firstName + " " + data.user.lastName)
                    if (data.user.profilePic){
                        setSenderPic(data.user.profilePic)
                    }
                    scrollToBottom();
                }
            }
        }
        getCont();

        return () => {};
    }, [slug]);

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

    //SUBMIT CHAT MESSAGE
    const submitChat = async () =>{
        const res = await fetch("/api/message/chat/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: messageText,
            })
        })
        if(res.ok){
            const data = await res.json();
            if(data.code === 1){
                setMessageText("")
            }
        }
    }

    ///////////////////////
    //SSE
    const [lists, setLists] = useState<messageArr[]>([])
    useEffect(() => {
        const eventSource = new EventSource('/api/message/sse/' + slug);
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received message:', data);
                setLists(data)
                scrollToBottom()
                // Handle the received data as needed
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
        // Clean up the EventSource connection when the component is unmounted
        return () => {
            eventSource.close();
        };
    }, [slug]); 

    const handleKeyPress = (e:any) => {
        if (e.key === 'Enter') {
            // Call your submit function here
            submitChat();
        }
    };
    
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
                                        style={{ backgroundImage: `url(` + senderPic +`)` }}
                                    ></div>
                                    <div>
                                        <h4 >
                                            <Link href="" className='text-color'>
                                                {senderName}
                                            </Link>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Link href={'/app/message'} >
                                        <button className='btn_back green-btn' ><i className="fa-solid fa-left-long"></i></button>
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="chat-sec">

                            <div className='chat-content-sec' ref={chatContentRef}>

                                {lists?.map((ele,index)=>(
                                    <ChatContent 
                                    key={index}
                                    content={ele.ele.content}
                                    me={ele.uType}
                                    ></ChatContent>
                                ))}

                            </div>

                            <div className="chat-input-sec">
                                <div>
                                    <ChatOptionBtn
                                        itemId={slug.toString()}
                                        itemType='message'
                                    />
                                </div>
                                <div>
                                    <div>
                                        <input 
                                        onChange={(e)=>draftChat(e.target.value)} 
                                        onKeyDown={handleKeyPress}
                                        value={messageText}
                                        type="text" 
                                        placeholder='Some text' 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div><button onClick={submitChat} ><i className="fa-solid fa-paper-plane"></i></button></div>
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

export default LocalMessageChat
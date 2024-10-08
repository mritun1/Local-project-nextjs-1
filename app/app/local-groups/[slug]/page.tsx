"use client"
import ChatContentGroup from '@/app/components/pages/message/ChatContentGroup';
import ChatOptionBtn from '@/app/components/pages/message/ChatOptionBtn';
import AppContent from '@/app/components/templates/AppContent'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

interface messageArr {
    ele: {
        chatContent: string;
        createdDate: number;
        files: [];
        images: [];
        videos: [];
    },
    uType: string,
    sender: string,
    senderId:string
}

const LocalGroupChat = () => {
    const {slug} = useParams();
    // const getBackFunc = new goBack();

    const [groupPic, setGroupPic] = useState<string>("/icons/others/profile.webp")
    const [groupName, setGroupName] = useState<string>("")
    const [messageText, setMessageText] = useState<string>("")

    const draftChat = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        setMessageText(e.target.value)
        const res = await fetch("/api/groups/chat/create/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                gId: slug,
                content: messageText
            })
        })
    }

    const handleKeyPress = async (e: any) =>{
        if(e.key === 'Enter'){
            //Function here
            await submitChat()
        }
    }

    const submitChat = async () =>{
        const res = await fetch("/api/groups/chat/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                gId: slug,
                content: messageText
            })
        })
        if (res.ok) {
            const data = await res.json()
            if (data.code === 1) {
                setMessageText("")
            }
        }
    }

    useEffect(()=>{
        const getTemp = async () =>{
            const res = await fetch("/api/groups/draft/chat/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    gId: slug
                })
            })
            if(res.ok){
                const data = await res.json()
                if(data.code===1){
                    if (data.groupPic){
                        setGroupPic(data.groupPic)
                    }
                    setGroupName(data.groupName)
                    if (data.content){
                        setMessageText(data.content)
                    }
                    
                }
            }
        }
        getTemp()
        return () =>{}
    }, [slug])

    //ALWAYS SCROLL DOWN
    const chatContentRef = useRef<HTMLDivElement>(null);
    // Function to scroll to the bottom of the chat content
    const scrollToBottom = () => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    };

    ///////////////////////
    //SSE
    const [lists, setLists] = useState<messageArr[]>([])
    useEffect(() => {
        const eventSource = new EventSource('/api/groups/chat/sse/' + slug);
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log(data);
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
                                        style={{ backgroundImage: `url(` +  groupPic + `)` }}
                                    ></div>
                                    <div>
                                        <h4 >
                                            <Link href="#" className='text-color'>
                                                {groupName}
                                            </Link>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Link href={'/app/local-groups/'} >
                                        <button className='btn_back green-btn' ><i className="fa-solid fa-left-long"></i></button>
                                    </Link>

                                </div>
                            </div>
                        </div>

                        <div className="chat-sec">

                            <div className='chat-content-sec' ref={chatContentRef}>

                                {lists?.map((ele, index) => (
                                    <ChatContentGroup
                                        key={index}
                                        content={ele.ele.chatContent}
                                        me={ele.uType}
                                        sender={ele.sender}
                                        senderId={ele.senderId}
                                    ></ChatContentGroup>
                                ))}

                            </div>
                            

                            <div className="chat-input-sec">
                                <div>
                                    <ChatOptionBtn 
                                        itemId={slug.toString()}
                                        itemType='local-group'
                                    />
                                </div>
                                <div>
                                    <div>
                                        <input
                                            onChange={(e) => draftChat(e)}
                                            onKeyUp={handleKeyPress}
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

export default LocalGroupChat
"use client"
import AppContent from '@/app/components/templates/AppContent'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface msgLists {
    item: {
        _id: string;
        bulkChat: number;
        bulkApproved: number;
        lastMessage: number;
    };
    user: {
        firstName: string;
        profilePic: string;
    };
}
const Page = () => {
    const router = useRouter();
    //OnClick Redirect
    const redirect = (e:string) =>{
        router.push(e)
    }
    const [lists, setLists] = useState<Array<msgLists>>([])
    useEffect(()=>{
        const fetchList = async () => {
            const res = await fetch("/api/message/lists/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    code:1
                })
            })
            if(res.ok){
                const data = await res.json()
                console.log(data)
                setLists(data.data)
            }
        }
        return () => {
            fetchList();
        }
    },[])
    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-tag"></i> Inbox (0)</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4><button><i className="fa-solid fa-plus"></i> <b>Bulk Chat</b></button></h4>
                                </div>
                            </div>
                        </div>

                        {lists?(
                            lists.map((ele,index)=>(
                                <div key={index} className="bar_btn_box">
                                    <div>
                                        <div>
                                            <div
                                                className='avatar-bg'
                                                style={{ 
                                                    backgroundImage: `url(${!ele.user.profilePic ? '/icons/others/profile.webp' : ele.user.profilePic})`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='msg-list'>
                                            <h5>{ele.user.firstName} <button className='badge bg-red'>5+</button></h5>
                                            <p>{ele.item.lastMessage}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div><button onClick={() => redirect("/app/message/"+ele.item._id)} ><i className="fa-solid fa-right-long"></i></button></div>
                                    </div>
                                </div>
                            ))
                        ):null}

                        {/* <div className="bar_btn_box">
                            <div>
                                <div>
                                    <div 
                                    className='avatar-bg'
                                        style={{ backgroundImage:`url(https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg)`}}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className='msg-list'>
                                    <h5>James Bond <button className='badge bg-red'>5+</button></h5>
                                    <p><small>Hi this is the last message...</small></p>
                                </div>
                            </div>
                            <div>
                                <div><button onClick={() => redirect("/app/message/chat/")} ><i className="fa-solid fa-right-long"></i></button></div>
                            </div>
                        </div>

                        <div className="bar_btn_box">
                            <div>
                                <div>
                                    <div
                                        className='avatar-bg'
                                        style={{ backgroundImage: `url(https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg)` }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className='msg-list'>
                                    <h5>James Bond <button className='badge bg-red'>5+</button></h5>
                                    <p><small>Hi this is the last message...</small></p>
                                </div>
                            </div>
                            <div>
                                <div><button ><i className="fa-solid fa-right-long"></i></button></div>
                            </div>
                        </div>

                        <div className="bar_btn_box">
                            <div>
                                <div>
                                    <div
                                        className='avatar-bg'
                                        style={{ backgroundImage: `url(https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg)` }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className='msg-list'>
                                    <h5>James Bond <button className='badge bg-red'>5+</button></h5>
                                    <p><small>Hi this is the last message...</small></p>
                                </div>
                            </div>
                            <div>
                                <div><button ><i className="fa-solid fa-right-long"></i></button></div>
                            </div>
                        </div> */}


                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default Page
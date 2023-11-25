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
        count: number;
    };
    user: {
        firstName: string;
        profilePic: string;
        otherName: string;
        lastUser: string;
    };
}
const LocalMessages = () => {
    const router = useRouter();
    //OnClick Redirect
    const redirect = (e: string) => {
        router.push(e)
    }
    const [lists, setLists] = useState<Array<msgLists>>([])
    useEffect(() => {
        const fetchList = async () => {
            const res = await fetch("/api/message/lists/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: 1
                })
            })
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setLists(data.data)
            }
        }
        fetchList();
        return () => { }
    }, [])

    //SHOW UNSEEN MESSAGE COUNT
    const showMgs = (e: string, f: number) => {
        if (e != 'me' && f > 0) {
            return true;
        }
        return false
    }
    //Count Number dynamic
    const ShowNum = (e: number) => {
        if (e > 9) {
            return `9+`
        }
        return e
    }
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

                        {lists ? (
                            lists.map((ele, index) => (
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
                                            <h5>{ele.user.firstName} {showMgs(ele.user.lastUser, ele.item.count) ? (<button className='badge bg-red'>{ShowNum(ele.item.count)}</button>) : ``} </h5>
                                            <p>{ele.user.otherName && ele.item.lastMessage != undefined ? (<><b>{ele.user.otherName}:</b> {String(ele.item.lastMessage).substring(0, 40)}...</>) : ``}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='forward'><button onClick={() => redirect("/app/message/" + ele.item._id)} ><i className="fa-solid fa-right-long"></i></button></div>
                                    </div>
                                </div>
                            ))
                        ) : null}

                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default LocalMessages
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
interface ProTye {
    content: string;
    me: string;
    sender: string | null;
    senderId: string;
}
const ChatContent = (props: ProTye) => {
    const [me, setMe] = useState<boolean>(false);
    useEffect(() => {
        if (props.me === 'me') {
            setMe(true)
        }
        return () => {}
    }, [props.me])
    return (
        <>
            <div className={me ? 'chat-right' : 'chat-left'}>
                <div style={{paddingBottom:`2px`}} className={
                    me ? "chat-content bg-dark-green" : "chat-content bg-light-green"
                }>
                    <p className='text-color' style={{paddingTop:`0px`,marginTop:`0px`}}>{
                        props.sender?(
                            <>
                                <Link href={"/page/people/"+props.senderId+"/"+props.sender}>
                                    <b className='text-light-orange small'><i>{props.sender}</i></b>
                                </Link>
                            <br/></>
                        ):null
                    }{props.content}</p>
                </div>
            </div>
        </>
    )
}

export default ChatContent
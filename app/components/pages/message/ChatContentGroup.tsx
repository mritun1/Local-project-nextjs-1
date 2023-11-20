import React, { useEffect, useState } from 'react'
interface ProTye {
    content: string;
    me: string;
    sender: string | null;
}
const ChatContent = (props: ProTye) => {
    const [me, setMe] = useState<boolean>(false);
    useEffect(() => {
        return () => {
            if (props.me === 'me') {
                setMe(true)
            }
        }
    }, [])
    return (
        <>
            <div className={me ? 'chat-right' : 'chat-left'}>
                <div style={{paddingBottom:`2px`}} className={
                    me ? "chat-content bg-dark-green" : "chat-content bg-light-green"
                }>
                    <p className='text-color2' style={{paddingTop:`0px`,marginTop:`0px`}}>{
                        props.sender?(
                            <><b className='text-light-orange small'><i>{props.sender}</i></b><br/></>
                        ):null
                    }{props.content}</p>
                </div>
            </div>
        </>
    )
}

export default ChatContent
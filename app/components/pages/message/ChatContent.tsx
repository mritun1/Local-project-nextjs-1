import React, { useEffect, useState } from 'react'
interface ProTye {
  content: string;
  me: string;
}
const ChatContent = (props: ProTye) => {
  const [me, setMe] = useState<boolean>(false);
  useEffect(() => {
    if (props.me == 'me') {
      setMe(true)
    }
    return () => {}
  }, [props.me])
  return (
    <>
      <div className={me ? 'chat-right' : 'chat-left'}>
        <div className={
          me ? "chat-content bg-dark-green" : "chat-content bg-light-green"
        }>
          <p className='text-color2'>{props.content}</p>
        </div>
      </div>
    </>
  )
}

export default ChatContent
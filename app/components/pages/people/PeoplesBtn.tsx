import { useRouter } from 'next/navigation'
import React from 'react'
type propsType = {
    id:String
}
const PeoplesBtn = (props:propsType) => {
    const router = useRouter()
    const chatHandler = async (e:String) =>{
        const res = await fetch("/api/message/check-create/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:e
            })
        })
        if(res.ok){
            const data = await res.json();
            console.log(data)
            if(data.code === 1){
                const msgIdString = data.msgId._id.toString();
                router.push("/app/message/" + msgIdString);
            }
        }
    }
  return (
    <>
          <div className="secondhand_btns">
              <div>
                  <button><i className="fa-solid fa-ellipsis"></i></button>
                  <p>More</p>
              </div>
              <div>
                  <button><i className="fa-solid fa-phone-volume"></i></button>
                  <p>Contact</p>
              </div>
              <div>
                  <button onClick={() => chatHandler(props.id)}><i className="fa-solid fa-message"></i></button>
                  <p>Chat</p>
              </div>
          </div>
    </>
  )
}

export default PeoplesBtn
"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ShareModel from '../../temp/ShareModel'
type propsType = {
    id:String,
    name:string
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
                if (data.msgId._id){
                    const msgIdString = data.msgId._id.toString();
                    router.push("/app/message/" + msgIdString);
                }
            }
        }
    }

    //SHARE BUTTON
    const shareTitle = decodeURIComponent(props.name.slice(0, 64))
    const [shareUrl, setShareUrl] = useState<string>('/page/people/' + props.id.toString() + '/' + shareTitle)
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        // Check if the user is on a mobile device
        const checkIsMobile = () => {
            setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
        };
        // Initial check
        checkIsMobile();
        // Update on resize
        window.addEventListener('resize', checkIsMobile);
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    const [isShare, setIsShare] = useState<boolean>(false);
    const clickShare = () => {
        setIsShare(!isShare)
    }

    const shareBtn = async () => {
        if (isMobile) {
            if (navigator.share) {
                try {
                    await navigator.share({
                        // title: props.itemTitle,
                        // text: props.itemDes,
                        url: 'https://localnii.com' + shareUrl,
                    });
                    console.log('Content shared successfully');
                } catch (error) {
                    console.log('Error sharing content:', error);
                }
            }
        } else {
            setIsShare(true)
        }
    };
  return (
    <>
          <div className="secondhand_btns">
              <div>
                  <button onClick={shareBtn}><i className="fa-solid fa-share"></i></button>
                  <p>Share</p>
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

          <ShareModel
              url={`https://localnii.com${shareUrl}`}
              state={isShare}
              click={clickShare}
          ></ShareModel>
    </>
  )
}

export default PeoplesBtn
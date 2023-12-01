"use client"
import React from 'react'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
interface propsType{
    url:string;
    state:boolean;
    click:()=>void;
}
const ShareModel = (props:propsType) => {
    const router = useRouter();
    const currentUrl = `${props.url}`;

    const shareOnTwitter = () => {
        const tweetText = 'Check out this awesome content!';
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(currentUrl)}`;
        window.open(tweetUrl, '_blank');
    };

    const shareOnFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(facebookUrl, '_blank');
    };

    const shareOnLinkedIn = () => {
        const linkedInUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}`;
        window.open(linkedInUrl, '_blank');
    };
  return (
    <>
          <Modal
              id="shareBtn"
              title="Share"
              isHidden={props.state}
              zIndex={1}
              modalClass={''}
              additionBtn={''}
              closeBtn={props.click}
          >
              <div className='shareButtons'>

                  <div><button onClick={shareOnTwitter}><i className="fa-brands fa-x-twitter"></i></button></div>
                  <div><button onClick={shareOnFacebook}><i className="fa-brands fa-facebook-f"></i></button></div>
                  <div><button onClick={shareOnLinkedIn}><i className="fa-brands fa-linkedin-in"></i></button></div>

              </div>
          </Modal>
    </>
  )
}

export default ShareModel
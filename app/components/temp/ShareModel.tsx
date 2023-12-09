"use client"
import React, { useState } from 'react'
import Modal from './Modal'
import copy from 'clipboard-copy'
interface propsType{
    url:string;
    state:boolean;
    click:()=>void;
}
const ShareModel = (props:propsType) => {
    const currentUrl = `${props.url}`;

    const [isCopyLink, setIsCopyLink] = useState<boolean>(false)

    const copyLinkHandle = async (e: string) => {
        await copy(e);
        setIsCopyLink(true);
        setTimeout(() => setIsCopyLink(false), 1500);
    }

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

              <div className="referral_box">
                  <div>
                      <h3>Copy Link</h3>
                  </div>
                  <div>
                      <input
                          type="text"
                          placeholder="Copy Link"
                          value={props.url}
                          onChange={() => { }}
                      />
                  </div>
                  <div>
                      {isCopyLink ? (
                          <button><i className="fa-solid fa-copy"></i> Copied</button>
                      ) : (
                              <button onClick={() => copyLinkHandle(props.url)}><i className="fa-solid fa-copy"></i> Copy</button>
                      )}

                  </div>
              </div>
          </Modal>
    </>
  )
}

export default ShareModel
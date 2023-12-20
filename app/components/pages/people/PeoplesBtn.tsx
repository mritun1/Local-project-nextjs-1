"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ShareModel from '../../temp/ShareModel'
import Modal from '../../temp/Modal'
import SecondHandSingleEle from '../secondhand/SecondHandSingleEle'
type propsType = {
    id: String,
    name: string
}
const PeoplesBtn = (props: propsType) => {
    const router = useRouter()
    const chatHandler = async (e: String) => {
        const res = await fetch("/api/message/check-create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: e
            })
        })
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            if (data.code === 1) {
                if (data.msgId._id) {
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

    //PAY FOR CONTACT
    const [payContact, setPayContact] = useState<boolean>(false);
    const [privateContact, setPrivateContact] = useState<boolean>(false);
    const [publicContact, setPublicContact] = useState<boolean>(false);

    const clickPayContact = () => {
        setPayContact(!payContact)
    }
    const clickPrivateContact = () => {
        setPrivateContact(!privateContact)
    }
    const clickPublicContact = () => {
        setPublicContact(!publicContact)
    }

    const [contacts, setContacts] = useState<[]>([])
    const clickContact = async () => {
        const res = await fetch("/api/people/single/" + props.id, {
            method: "GET"
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            if (data.data[0].contactPermission) {
                if (data.data[0].contactPermission === 'Sell') {
                    setPayContact(true)
                } else if (data.data[0].contactPermission === 'Private') {
                    setPrivateContact(true)
                } else {
                    setPublicContact(!publicContact)
                    if (data.data[0].contacts) {
                        setContacts(data.data[0].contacts)
                    }
                }
            }

        }


    }
    return (
        <>
            <div className="secondhand_btns">
                <div>
                    <button onClick={shareBtn}><i className="fa-solid fa-share"></i></button>
                    <p>Share</p>
                </div>
                <div>
                    <button onClick={clickContact}><i className="fa-solid fa-phone-volume"></i></button>
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

            <Modal
                id="shareBtn"
                title="Get Contact"
                isHidden={payContact}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={clickPayContact}
            >
                <div className='contributionOnMgs'>

                    <div>
                        <p>Pay to get the contact information. So that only those who really need contact get it.</p>
                        <h3>Bal: <i className="fa-solid fa-indian-rupee-sign"></i> 0/-</h3>
                    </div>
                    <div>
                        <input
                            type="number"
                            name="money"
                            id="money"
                            placeholder='Amount'
                            onChange={(e) => { }}
                            value={10}
                            disabled
                            style={{ backgroundColor: `lightgray`, color: `black` }}
                        />
                    </div>
                    <div className='contributeOnMgsBtn'>
                        <button ><i className="fa-solid fa-paper-plane"></i> Pay</button>
                    </div>
                </div>

            </Modal>

            <Modal
                id="privateBtn"
                title="Contact is Private"
                isHidden={privateContact}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={clickPrivateContact}
            >
                <div className='contributionOnMgs'>

                    <div>
                        <p>Sorry, the owner don`t want to share his/her contact details, please find another users.</p>
                        <h3>Contact Hidden</h3>
                    </div>

                </div>

            </Modal>

            <Modal
                id="publicBtn"
                title="Contact Details"
                isHidden={publicContact}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={clickPublicContact}
            >
                <div className='div-box'>

                    {contacts.map((ele, index) => (
                        <SecondHandSingleEle
                            key={index}
                            content={ele}
                        ></SecondHandSingleEle>
                    ))}

                </div>

            </Modal>
        </>
    )
}

export default PeoplesBtn
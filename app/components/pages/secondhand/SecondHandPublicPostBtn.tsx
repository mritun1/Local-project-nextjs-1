import React, { useEffect, useState } from 'react'
import Modal from '../../temp/Modal'
import SecondHandSingleEle from './SecondHandSingleEle'
import ShareModel from '../../temp/ShareModel'

type propsType = {
    name: String,
    des: String,
    contact1: number,
    contact2: number,
    id:string
}

const SecondHandPublicPostBtn = (props:propsType) => {
    const [modal,setModal] = useState<boolean>(false)
    const openModal = () => {
        setModal(!modal)
    }
    const [modalContact, setModalContact] = useState<boolean>(false)
    const openModalContact = () => {
        setModalContact(!modalContact)
    }

    const CheckMessage = async () =>{
        const res = await fetch("/api/message/product-msg-check/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:props.id,
                type:'secondhand'
            })
        })
        if(res.ok){
            const data = await res.json();
            console.log(data)
            if(data.code === 1){
                window.location.href = '/app/message/' + data.msgId;
            }
        }
    }
    
    //SHARE BUTTON
    const shareTitle = decodeURIComponent(props.name.slice(0, 64))
    const [shareUrl, setShareUrl] = useState<string>('/page/secondhand/' + props.id + '/' + shareTitle)
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
        setModal(false)
        if (isMobile) {
            if (navigator.share) {
                try {
                    await navigator.share({
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
                    <button onClick={openModal}><i className="fa-solid fa-ellipsis"></i></button>
                    <p>More</p>
                </div>
                <div>
                    <button onClick={openModalContact} ><i className="fa-solid fa-phone-volume"></i></button>
                    <p>Contact</p>
                </div>
                <div>
                    <button onClick={CheckMessage}><i className="fa-solid fa-message"></i></button>
                    <p>Message</p>
                </div>
            </div>

            <ShareModel
                url={`https://localnii.com${shareUrl}`}
                state={isShare}
                click={clickShare}
            ></ShareModel>

            <Modal
                id="moreModal"
                title={props.name.toString()}
                isHidden={modal}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={openModal}
            >
                
                <div className='div-box'>
                    
                    <div className="post_options">
                        <div className='col-3'>
                            <div>
                                <button>
                                    <i className="fa-solid fa-floppy-disk"></i> Save
                                </button>

                            </div>
                            <div>
                                {/* <button >
                                    <i className="fa-solid fa-indian-rupee-sign"></i> Contribute
                                </button> */}

                            </div>
                            <div>
                                <button onClick={shareBtn} >
                                    <i className="fa-solid fa-share"></i> Share
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="single-ele-text">
                        <p className='text-color'>{props.des}</p>
                    </div>

                </div>
                
            </Modal>

            <Modal
                id="contact"
                title="Contact"
                isHidden={modalContact}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={openModalContact}
            >
                
                <div className='div-box'>
                    <SecondHandSingleEle 
                        content={props.contact1?.toString()}
                    ></SecondHandSingleEle>
                    <SecondHandSingleEle
                        content={props.contact2?.toString()}
                    ></SecondHandSingleEle>
                </div>

            </Modal>
        </>
    )
}

export default SecondHandPublicPostBtn
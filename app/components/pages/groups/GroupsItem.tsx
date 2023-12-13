import React, { useEffect, useState } from 'react'
import MoreBtn2 from '../../buttons/MoreBtn2'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import ShareModel from '../../temp/ShareModel';
interface propsType {
    name: String;
    pic: String;
    members: [];
    id: String;
    btn: String;
}
const GroupsItem = (props: propsType) => {
    const [joinLoad, setJoinLoad] = useState<boolean>(false)
    const [changeBtn, setChangeBtn] = useState<boolean>(false)
    const router = useRouter();
    //OnClick Redirect
    const redirect = (e: string) => {
        router.push(e)
    }
    const join = async () => {
        setJoinLoad(true)
        const res = await fetch("/api/groups/join/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                gId: props.id
            })
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            setJoinLoad(false)
            setChangeBtn(true)
        }
    }
    useEffect(() => {
        if (props.btn === "joined") {
            setChangeBtn(true)
        }
        return () => { }
    }, [props.btn])

    //---------------------------------------------------------------------
    const shareTitle = decodeURIComponent(props.name.slice(0, 64))
    const [shareUrl, setShareUrl] = useState<string>('/page/group/' + props.id + '/' + shareTitle)
    //SHARE BUTTON
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

            <ShareModel
                url={`https://localnii.com${shareUrl}`}
                state={isShare}
                click={clickShare}
            ></ShareModel>

            <div className="bar_btn_box">
                <div>
                    <div>
                        <div
                            className='avatar-bg'
                            style={{
                                backgroundImage: `url(${props.pic ? props.pic : '/icons/others/profile.webp'})`
                            }}
                        ></div>
                    </div>
                </div>
                <div>
                    <div className='msg-list'>
                        <h5>{props.name}
                            {/* <button className='badge bg-red'>3</button> */}
                        </h5>
                        <p><b>Mritun:</b> sdf sdf sdf ...</p>
                        <p className='small'>{props.members.length}+</p>
                    </div>
                </div>
                <div>


                    {changeBtn ? (
                        <>
                            <div className='forward'>
                                <button onClick={() => redirect("/app/local-groups/" + props.id)} ><i className="fa-solid fa-right-long"></i></button>
                                <MoreBtn2
                                    moreText={
                                        <>
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </>
                                    }
                                    btnClass={'text-right'}
                                >
                                    <li><i className="fa-regular fa-flag"></i> Report</li>
                                    <li><i className="fa-solid fa-rectangle-ad"></i> Promote</li>
                                    <li onClick={shareBtn}><i className="fa-solid fa-share"></i> Share</li>
                                </MoreBtn2>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='join'>
                                <button onClick={join} >
                                    {joinLoad ? (
                                        <>
                                            <Image
                                                src="/icons/others/loading.webp"
                                                width={20}
                                                height={20}
                                                alt='loading'
                                            />
                                        </>
                                    ) : (

                                        <><i className="fa-solid fa-plus"></i> Join</>
                                    )}
                                </button>
                                <MoreBtn2
                                    moreText={
                                        <>
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </>
                                    }
                                    btnClass={'text-right'}
                                >
                                    <li><i className="fa-regular fa-flag"></i> Report</li>
                                    <li><i className="fa-solid fa-rectangle-ad"></i> Promote</li>
                                    <li onClick={shareBtn}><i className="fa-solid fa-share"></i> Share</li>
                                </MoreBtn2>


                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

export default GroupsItem
"use client"
import React, { useEffect, useState } from 'react'
import style from '@/app/styles/scss/localoffers.module.scss'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const MenuModal = () => {
    const router = useRouter();

    const [fullName,setFullName] = useState<string>("")
    const [profilePic, setProfilePic] = useState<string>("/icons/others/profile.webp")

    //NOTIFICATION - START
    const [noti, setNoti] = useState<number>(0)
    const [mgsCount, setMgsCount] = useState<number>(0)
    useEffect(() => {
        const eventSource = new EventSource('/api/notice/sse/');
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log(data);
                setNoti(data[0].notification)
                setMgsCount(data[0].mgsCount)
                // Handle the received data as needed
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
        // Clean up the EventSource connection when the component is unmounted
        return () => {
            eventSource.close();
        };
    }, [mgsCount]);
    //NOTIFICATION - END

    useEffect(()=>{

        const fetchData = async () => {
            const res = await fetch("/api/auth/me",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    code:1
                })
            });

            if (res.ok) {
                const data = await res.json();
                setFullName(data.firstName + " " + data.lastName);
                if (data.profilePic){
                    setProfilePic(data.profilePic)
                }
                
            }
        };
        fetchData();
        return () => {};
        
    },[])

    const [isHidden, setIsHidden] = useState<boolean>(false);
    const displayModal = () => {
        setIsHidden(!isHidden)
    }

    const [isClicked, setIsClicked] = useState<boolean>(true);
    const logout = async () =>{
        setIsClicked(!isClicked)
        const res = await fetch("/api/auth/logout",{
            method:'POST',
            body:JSON.stringify({
                logout:'ya'
            })
        })
        if(!res.ok){
            console.log("Could not logged out")
        }else{
            setIsClicked(!isClicked)
            router.push('/');
        }
    }

    const goHref = (e:string) =>{
        router.push(e)
        setIsHidden(false)
    }

    return (
        <>

            <div className="container_full head">
                <div className="container head_col">
                    <div >
                        <div>
                            <Image src="/icons/logo/logo1.png" alt='Logo' width={45} height={45} />
                        </div>
                        <div>
                            <h2 >OCAL<small>nii</small></h2>
                        </div>
                    </div>
                    <div >

                        <div className="menu">
                            {/* <div title="Delivery Order">
                                <button><i className="fa-solid fa-truck"></i></button>
                                <button>2</button>
                            </div>
                            <div title="Sell Order">
                                <button><i className="fa-solid fa-clipboard-check"></i></button>
                                <button>2</button>
                            </div> */}
                            <div title="Messages" onClick={() => goHref('/app/message')}>
                                <button><i className="fa-solid fa-message"></i></button>
                                <button className={mgsCount > 0 ? 'red' : 'lightGreen'} >{mgsCount}</button>
                            </div>
                            <div title="Notification" onClick={() => goHref('/app/notification')}>
                                <button><i className="fa-solid fa-bell"></i></button>
                                <button className={noti > 0 ? 'red':'lightGreen'}>{noti}</button>
                            </div>

                            <div onClick={displayModal} className="profile_img">
                                <div>
                                    <div style={{ backgroundImage: `url(${profilePic})` }} ></div>
                                </div>
                                <div><i className="fa-solid fa-ellipsis-vertical"></i></div>
                            </div>



                        </div>

                    </div>
                </div>
            </div>


            <div id="menuModal" className="modal" style={{ display: isHidden ? 'block' : 'none',zIndex:1 }} >
                <div className="modal_bg"></div>
                <div className="modal_body">
                    <div className="sign_up">
                        <div className="modal_head">
                            <div>
                                <h2>Menu</h2>
                            </div>
                            <div>
                                <div className='others green_btn'>
                                    <Link href="/app/settings">
                                        <button onClick={displayModal} ><i className="fa-solid fa-gear text-color"></i></button>
                                    </Link>
                                </div>
                                <div className='close'><button onClick={displayModal} ><i className="fa-solid fa-xmark"></i></button></div>
                            </div>
                        </div>

                        <div className={style.menuModal}>

                            <div className="profile_bar_btn">
                                <div>
                                    <div className="img" style={{ backgroundImage: `url(${profilePic})` }}></div>
                                </div>
                                <div>
                                    <div><Link href=""><h4>{fullName}</h4></Link></div>
                                </div>
                                <div>
                                    <div>
                                        <Link href="/app/profile">
                                            <button onClick={displayModal}><i className="fa-regular fa-id-badge"></i></button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* ROW 1 START */}
                            <div className='display-flex light-bottom-border menu-row' >

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div onClick={() => goHref('/app/my-wallet')}><i className="fa-solid fa-sack-dollar"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>My Wallet</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div onClick={() => goHref('/app/my-contacts')}><i className="fa-solid fa-address-book"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Contacts</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div onClick={() => goHref('/app/my-saved')}><i className="fa-solid fa-floppy-disk"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Saved</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div onClick={() => goHref('/app/pin-code-map')}><i className="fa-solid fa-map"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Map</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div onClick={logout} className="img" >
                                        <div style={{ backgroundColor: "red" }}>
                                            {isClicked?(
                                                <i className="fa-solid fa-right-from-bracket"></i>
                                            ):(
                                                <Image
                                                    src={"/icons/others/loading.webp"}
                                                    alt='Loading'
                                                    width={35}
                                                    height={35}
                                                    style={{ borderRadius: `50%` }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="btn">
                                        <p>Logout</p>
                                    </div>
                                </div>

                            </div>
                            {/* ROW 1 END */}

                            {/* ROW 2 START */}
                            {/* <div className='display-flex menu-row'>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-regular fa-rectangle-list"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Orders</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-regular fa-id-card"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Business</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-solid fa-chart-simple"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Analytics</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-solid fa-map"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Map</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-solid fa-bullhorn"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>My Ads</p>
                                    </div>
                                </div>

                            </div> */}
                            {/* ROW 2 END */}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuModal
"use client"
import React, { useEffect, useState } from 'react'
import style from '@/app/styles/scss/localoffers.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const MenuModal = () => {
    const router = useRouter();

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

    return (
        <>

            <div className="container_full head">
                <div className="container head_col">
                    <div >
                        <div>
                            <Image src="/icons/logo/logo1.png" alt='Logo' width={45} height={45} />
                        </div>
                        <div>
                            <h2 >OCALNII</h2>
                        </div>
                    </div>
                    <div >

                        <div className="menu">
                            <div title="Delivery Order">
                                <button><i className="fa-solid fa-truck"></i></button>
                                <button>2</button>
                            </div>
                            <div title="Sell Order">
                                <button><i className="fa-solid fa-clipboard-check"></i></button>
                                <button>2</button>
                            </div>
                            <div title="Messages">
                                <button><i className="fa-solid fa-message"></i></button>
                                <button>2</button>
                            </div>
                            <div title="Notification">
                                <button><i className="fa-solid fa-bell"></i></button>
                                <button>9+</button>
                            </div>

                            <div onClick={displayModal} className="profile_img">
                                <div>
                                    <div style={{ backgroundImage: `url(https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,g_center,q_60,w_645/0ac071df51837e4b91b71842ea368862.jpg)` }} ></div>
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
                                    <Link href="">
                                        <button ><i className="fa-solid fa-gear"></i></button>
                                    </Link>
                                </div>
                                <div className='close'><button onClick={displayModal} ><i className="fa-solid fa-xmark"></i></button></div>
                            </div>
                        </div>

                        <div className={style.menuModal}>

                            <div className="profile_bar_btn">
                                <div>
                                    <div className="img" style={{ backgroundImage: `url(https://th-i.thgim.com/public/incoming/9uvnty/article67222424.ece/alternates/BASE_SQUARE/2023-08-04T094328Z_1224629970_RC2WG2AC6YU7_RTRMADP_3_WPP-RESULTS-TWITTER.JPG)` }}></div>
                                </div>
                                <div>
                                    <div><Link href=""><h4>Mritunjoy Mushahary</h4></Link></div>
                                </div>
                                <div>
                                    <div>
                                        <Link href="">
                                            <button><i className="fa-regular fa-id-badge"></i></button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* ROW 1 START */}
                            <div className='display-flex light-bottom-border'>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-solid fa-sack-dollar"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Earnings</p>
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

                            {/* ROW 1 START */}
                            <div className='display-flex'>

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
                                        <div><i className="fa-solid fa-address-book"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Contacts</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-solid fa-floppy-disk"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Saved</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-solid fa-users-rectangle"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Groups</p>
                                    </div>
                                </div>

                            </div>
                            {/* ROW 2 END */}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuModal
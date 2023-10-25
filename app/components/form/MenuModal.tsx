"use client"
import React, { useEffect, useState } from 'react'
import style from '@/app/styles/scss/localoffers.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const MenuModal = () => {
    const router = useRouter();

    const [isHidden, setIsHidden] = useState<boolean>(false);
    const displayModal = () => {
        setIsHidden(!isHidden)
    }

    const logout = async () =>{
        
        const res = await fetch("/api/auth/logout",{
            method:'POST',
            body:JSON.stringify({
                logout:'ya'
            })
        })
        if(!res.ok){
            console.log("Could not logged out")
        }else{
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
                                <div><button onClick={displayModal} ><i className="fa-solid fa-xmark"></i></button></div>
                            </div>
                        </div>

                        <div className={style.menuModal}>

                            {/* ROW 1 START */}
                            <div className='display-flex'>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-regular fa-id-badge"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Profile</p>
                                    </div>
                                </div>

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
                                        <div><i className="fa-solid fa-gear"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Settings</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div onClick={logout} className="img" >
                                        <div style={{ backgroundColor: "red" }}><i className="fa-solid fa-right-from-bracket"></i></div>
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
                                        <div><i className="fa-regular fa-id-badge"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Local News</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img">
                                        <div><i className="fa-solid fa-sack-dollar"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Local Events</p>
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
                                        <div><i className="fa-solid fa-gear"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Settings</p>
                                    </div>
                                </div>

                                <div className='circle-gal-btn'>
                                    <div className="img" >
                                        <div style={{ backgroundColor: "red" }}><i className="fa-solid fa-right-from-bracket"></i></div>
                                    </div>
                                    <div className="btn">
                                        <p>Logout</p>
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
"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Modal from '../../temp/Modal';
import PinModel from '../../templates/PinModel';

const MobFootMenu = () => {
    const pathname = usePathname();
    //FOR HOME
    const [homeShow, isHomeShow] = useState<boolean>(false);
    const homeClick = () => {
        isHomeShow(!homeShow)
    }
    //FOR HOME
    const [addShow, isAddShow] = useState<boolean>(false);
    const addClick = () => {
        isAddShow(!addShow)
    }
    //ON CLICK REDIRECT
    const router = useRouter();
    const goHref = (e: string) => {
        router.push(e)
        isHomeShow(false)
        isAddShow(false)
    }
    //PIN CODE
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const toggleModal = () => {
        setIsHidden(!isHidden)
    }
    
    return (
        <>
            {pathname.startsWith('/app/local-groups/') || pathname.startsWith('/app/message/') ?null:(
                <div className="mob-foot-menu">
                    <div className='display-flex light-bottom-border menu-row' >

                        <div onClick={homeClick} className='circle-gal-btn'>
                            <div className="img">
                                <div><i className="fa-solid fa-house"></i></div>
                            </div>
                        </div>

                        <div onClick={toggleModal} className='circle-gal-btn'>
                            <div className="img">
                                <div ><i className="fa-solid fa-street-view"></i></div>
                            </div>
                        </div>

                        <div onClick={addClick} className='circle-gal-btn'>
                            <div className="img">
                                <div ><i className="fa-solid fa-plus"></i></div>
                            </div>
                        </div>

                        <div className='circle-gal-btn'>
                            <div className="img">
                                <div onClick={() => goHref('/app/local-people')} ><i className="fa-solid fa-users"></i></div>
                            </div>
                        </div>

                        <div className='circle-gal-btn'>
                            <div className="img">
                                <div ><i className="fa-solid fa-magnifying-glass"></i></div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <PinModel
                toggleModal={toggleModal}
                isHidden={isHidden}
            ></PinModel>
            

            <Modal
                id="add"
                title="Add Content"
                isHidden={addShow}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={addClick}
            >

                <div>

                    <div onClick={() => goHref('/app/my-posts')} className="divList">
                        <div>
                            <div>
                                <i className="fa-solid fa-newspaper"></i>
                            </div>
                        </div>
                        <div>
                            <p>Add News & Events</p>
                        </div>
                        <div>
                            <div>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => goHref('/app/my-secondhand')} className="divList">
                        <div>
                            <div>
                                <i className="fa-solid fa-recycle"></i>
                            </div>
                        </div>
                        <div>
                            <p>Add SecondHand</p>
                        </div>
                        <div>
                            <div>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => goHref('/app/my-referral')} className="divList">
                        <div>
                            <div>
                                <i className="fa-solid fa-users-rays"></i>
                            </div>
                        </div>
                        <div>
                            <p>Add Referral</p>
                        </div>
                        <div>
                            <div>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </Modal>


            <Modal
                id="home"
                title="Home"
                isHidden={homeShow}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={homeClick}
            >

                <div>

                    <div onClick={() => goHref('/app/local-news')} className="divList">
                        <div>
                            <div>
                                <i className="fa-solid fa-clipboard-list"></i>
                            </div>
                        </div>
                        <div>
                            <p>Local News</p>
                        </div>
                        <div>
                            <div>
                                <i className="fa-solid fa-circle-arrow-right"></i>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => goHref('/app/local-events')} className="divList">
                        <div>
                            <div>
                                <i className="fa-regular fa-calendar"></i>
                            </div>
                        </div>
                        <div>
                            <p>Local Events</p>
                        </div>
                        <div>
                            <div>
                                <i className="fa-solid fa-circle-arrow-right"></i>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => goHref('/app/local-secondhand')} className="divList">
                        <div>
                            <div>
                                <i className="fa-solid fa-bag-shopping"></i>
                            </div>
                        </div>
                        <div>
                            <p>Local Secondhand</p>
                        </div>
                        <div>
                            <div>
                                <i className="fa-solid fa-circle-arrow-right"></i>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => goHref('/app/local-groups')} className="divList">
                        <div>
                            <div>
                                <i className="fa-solid fa-users-rectangle"></i>
                            </div>
                        </div>
                        <div>
                            <p>Local Groups</p>
                        </div>
                        <div>
                            <div>
                                <i className="fa-solid fa-circle-arrow-right"></i>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => goHref('/app/local-people')} className="divList">
                        <div>
                            <div>
                                <i className="fa-solid fa-users"></i>
                            </div>
                        </div>
                        <div>
                            <p>Local People</p>
                        </div>
                        <div>
                            <div>
                                <i className="fa-solid fa-circle-arrow-right"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default MobFootMenu
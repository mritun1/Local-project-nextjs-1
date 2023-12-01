"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const MenuModal = () => {
    const router = useRouter();
    const goHref = (e: string) => {
        router.push(e)
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
                            
                            <div title="Notification" onClick={() => goHref('/app/local-news')}>
                                <button><i className="fa-solid fa-home"></i></button> 
                            </div>

                        </div>

                    </div>
                </div>
            </div>


            
        </>
    )
}

export default MenuModal
import React, { useEffect, useState } from 'react'
import MoreBtn2 from '../../buttons/MoreBtn2'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
interface propsType {
    name: String;
    pic: String;
    members: [];
    id: String;
    btn:String;
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
    useEffect(()=>{
        if (props.btn === "joined") {
            setChangeBtn(true)
        }
        return ()=>{}
    }, [props.btn])
    return (
        <>
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
                                <button onClick={() => redirect("/app/local-groups/"+props.id)} ><i className="fa-solid fa-right-long"></i></button>
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
                                    <li><i className="fa-solid fa-share"></i> Share</li>
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
                                    <li><i className="fa-solid fa-share"></i> Share</li>
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
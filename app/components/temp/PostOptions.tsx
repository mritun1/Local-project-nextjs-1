"use client"
import React, { useEffect, useState } from 'react'
import Modal from './Modal'

interface propsType {
    itemId:string;
    itemType:string;
}
interface contArr {
    item:{
        amount:number;
        comments:string;
    }
    user:{
        firstName:string;
        lastName:string;
        profilePic:string;
    }
}

const PostOptions = (props:propsType) => {
    const [isContribute,setIsContribute] = useState<boolean>(false);
    const clickContribute = () =>{
        setIsContribute(!isContribute);
    }
    //Click Contribute
    const [contributeAmount, setContributeAmount] = useState<string | null>(null)
    const [contributeComment, setContributeComment] = useState<string | null>(null)
    const clickContributeFetch = async () =>{
        const res = await fetch("/api/contributions/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                itemId: props.itemId,
                itemType: props.itemType,
                amount:contributeAmount,
                comment:contributeComment
            })
        })
        if(res.ok){
            const data = await res.json();
            if(data.code === 1){
                loadCOnt();
                setContributeAmount('')
                setContributeComment('')
            }
        }
    }
    //Load Contribute Content
    const [contList,setContList] = useState<contArr[]>([])
    const loadCOnt = async () => {
        const res = await fetch("/api/contributions/comments/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemId: props.itemId,
                itemType: props.itemType,
            })
        })
        if (res.ok) {
            const data = await res.json();
            
            if (data.code === 1) {
                setContList(data.data)
            }
        }
    }
    useEffect(()=>{
        const loadCOnt = async () => {
            const res = await fetch("/api/contributions/comments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    itemId: props.itemId,
                    itemType: props.itemType,
                })
            })
            if (res.ok) {
                const data = await res.json();

                if (data.code === 1) {
                    setContList(data.data)
                }
            }
        }
        loadCOnt();
        return () => {}
    },[props.itemId, props.itemType])
    return (
        <>
            <div className="post_options">
                <div className='details'>
                    <p>784 contributed</p>
                </div>
                <div className='col-3'>
                    <div>
                        <button>
                            <i className="fa-solid fa-floppy-disk"></i> Save
                        </button>
                    </div>
                    <div>
                        <button onClick={clickContribute}>
                            <i className="fa-solid fa-indian-rupee-sign"></i> Contribute
                        </button>
                    </div>
                    <div>
                        <button>
                            <i className="fa-solid fa-share"></i> Share
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                id="contribution"
                title="Contribution"
                isHidden={isContribute}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={clickContribute}
            >
                <div className='contribution'>

                    <div className="contribution-inputs">
                        <div className='contribution-bal-rupee'>
                            <div>
                                <div><i className="fa-solid fa-indian-rupee-sign"></i> <input type="number" onChange={(e) => setContributeAmount(e.target.value)} value={contributeAmount || ''} placeholder='Amount' /></div>
                            </div>
                            <div>
                                <div><h4>Bal: <i className="fa-solid fa-indian-rupee-sign"></i> 343/-</h4></div>
                            </div>
                        </div>
                        <div className="contribution-text">
                            <div>
                                <div><textarea onChange={(e)=>setContributeComment(e.target.value)} value={contributeComment || ''} name="comment" id="contribute-comment" rows={1} placeholder='Say something'></textarea></div>
                            </div>
                            <div>
                                <div>
                                    <button onClick={clickContributeFetch}><i className="fa-solid fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contribution-msg">

                        {contList?(
                            contList.map((ele,index)=>(
                                <div key={index} className="contribute-cont">
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div style={{ backgroundImage: `url(${ele.user.profilePic ? ele.user.profilePic : '/icons/others/profile.webp'})` }} ></div>
                                                </div>
                                                <div>
                                                    <p>{ele.user.firstName + ' ' + ele.user.lastName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h5><i className="fa-solid fa-indian-rupee-sign"></i> {ele.item.amount}</h5>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{ele.item.comments}</p>
                                    </div>
                                </div>
                            ))
                        ):null}

                        
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default PostOptions
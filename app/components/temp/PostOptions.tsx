import React, { useState } from 'react'
import Modal from './Modal'

interface propsType {
    itemId:string;
    itemType:string;
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
        // const res = await fetch("",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //         itemId: props.itemId,
        //         itemType: props.itemType,
        //         amount:contributeAmount,
        //         comment:contributeComment
        //     })
        // })
    }
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
                        <div className="contribute-cont">
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div style={{ backgroundImage: `url('/icons/others/profile.webp')` }} ></div>
                                        </div>
                                        <div>
                                            <p>User Name</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3><i className="fa-solid fa-indian-rupee-sign"></i> 50</h3>
                                </div>
                            </div>
                            <div>
                                <p>This is the text of workd</p>
                            </div>
                        </div>

                        <div className="contribute-cont">
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div style={{ backgroundImage: `url('/icons/others/profile.webp')` }} ></div>
                                        </div>
                                        <div>
                                            <p>User Name</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3><i className="fa-solid fa-indian-rupee-sign"></i> 50</h3>
                                </div>
                            </div>
                            <div>
                                <p>This is the text of workd</p>
                            </div>
                        </div>

                        <div className="contribute-cont">
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div style={{ backgroundImage: `url('/icons/others/profile.webp')` }} ></div>
                                        </div>
                                        <div>
                                            <p>User Name</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3><i className="fa-solid fa-indian-rupee-sign"></i> 50</h3>
                                </div>
                            </div>
                            <div>
                                <p>This is the text of workd</p>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default PostOptions
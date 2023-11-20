import React from 'react'
import MoreBtn2 from '../../buttons/MoreBtn2'
interface propsType {
    name:String;
    pic:String;
    members:[];
}
const GroupsItem = (props:propsType) => {
    return (
        <>
            <div className="bar_btn_box">
                <div>
                    <div>
                        <div
                            className='avatar-bg'
                            style={{
                                backgroundImage: `url(${props.pic ? props.pic :'/icons/others/profile.webp'})`
                            }}
                        ></div>
                    </div>
                </div>
                <div>
                    <div className='msg-list'>
                        <h5>{props.name} <button className='badge bg-red'>3</button></h5>
                        <p><b>Mritun:</b> sdf sdf sdf ...</p>
                        <p className='small'>{props.members.length}+</p>
                    </div>
                </div>
                <div>
                    <div className='join'>
                        <button >
                            <i className="fa-solid fa-plus"></i> Join
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
                </div>
            </div>
        </>
    )
}

export default GroupsItem
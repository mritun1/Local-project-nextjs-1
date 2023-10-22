"use client"
import React, { useState } from 'react'

const More1 = () => {
    const [isHidden,setIsHidden] = useState(true)
    const moreBtn = () =>{
        setIsHidden(!isHidden)
    }
  return (
    <>
        <button onClick={moreBtn} className="more_btn_cont">more <i className="fa-solid fa-caret-down"></i></button>

        <div id="more_list1" style={{ display: isHidden ? `none` : `block` }} className="more_list">
            <ul>
                <li><i className="fa-solid fa-floppy-disk"></i> Save</li>
                <li><i className="fa-regular fa-flag"></i> Report</li>
                <li><i className="fa-solid fa-rectangle-ad"></i> Promote</li>
                <li><i className="fa-solid fa-share"></i> Share</li>
            </ul>
        </div>
    </>
  )
}

export default More1
import React from 'react'
import Image from 'next/image'

const Loading = () => {
  return (
    <>
        <div className="loading">
            <div className="loading_bg"></div>
            <div className="loading_img">
                <div><Image 
                src="/icons/others/loading.webp" 
                alt="loading" 
                width={180}
                height={180}
                /></div>
            </div>
        </div>
    </>
  )
}

export default Loading
"use client"
import React, { useState } from 'react'
import copy from 'clipboard-copy'
type typePros = {
    content:String
}
const SecondHandSingleEle = (props:typePros) => {
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const handleCopy = async (e: string) => {
        try {
            await copy(e);
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.log("Error while copying")
        }
    }
  return (
    <>
          <div className="single-ele">
              <div>
                  <h3 className='text-color2'><i className="fa-solid fa-square-phone"></i> {props.content}</h3>
              </div>
              <div>
                  <div>
                      <button onClick={() => handleCopy(props.content.toString())} >
                          <i className="fa-solid fa-copy"></i> {isCopied ? ('Copied') : ('Copy')}
                      </button>
                  </div>
              </div>
          </div>
    </>
  )
}

export default SecondHandSingleEle
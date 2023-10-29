"use client"
import React, { ReactNode } from 'react'
import Image from 'next/image'

type propsType = {
    submitLoad : boolean,
    children:ReactNode
}
const ButtonLoading = (props:propsType) => {
  return (
    <>
          {props.submitLoad ?
              (
                  props.children
              ) : (
                  <div className="btn_loading">
                      <p>
                          <Image src="/icons/others/loading.webp" alt="Loading img" width={20} height={20} />
                          Loading...
                      </p>
                  </div>
              )
          }
    </>
  )
}

export default ButtonLoading
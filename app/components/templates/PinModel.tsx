"use client"
import React, { useEffect, useState } from 'react'
import Modal from '../temp/Modal'
import ButtonLoading from '../temp/ButtonLoading';
interface propsType{
    toggleModal:()=>void;
    isHidden:boolean;
}
const PinModel = (props:propsType) => {
    const [submitBtn, setSubmitBtn] = useState<boolean>(true);
    const [pinVal, setPinVal] = useState<string>('');
    const submitHandler = async (e: string) => {
        setSubmitBtn(false)
        const res = await fetch("/api/others/changepin/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pin: pinVal,
                type:e
            })
        })
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            if (data.code === 1) {
                setSubmitBtn(true)
                //RELOAD ON SUCCESS
                window.location.reload();
            }
        }
    }
    const eventPin = (e: string) => {
        setPinVal(e)
    }
    useEffect(()=>{
        const pin = async() =>{
            const res = await fetch("/api/onload/leftmenu/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code:1
                })
            })
            if (res.ok) {
                const data = await res.json();
                if (data.code === 1) {
                    setPinVal(data.pin)
                }
            }
        }
        pin()
        return () => {}
    },[])
  return (
    <>
          <Modal
              id="changePin"
              title="Change PIN Code"
              isHidden={props.isHidden}
              zIndex={1}
              modalClass={''}
              additionBtn={''}
              closeBtn={props.toggleModal}
          >

              <div id='fromForEvent' className="sign_up_form">
                  <form onSubmit={()=>{}}>

                      <p className='text-color2'>Enter Your PIN</p>

                      <div className="sign_up_one_col">
                          <div><input type={'text'} name={'pin'} placeholder={'Your PIN'}
                              onChange={(e) => eventPin(e.target.value)}
                              value={pinVal || ''}
                              required /></div>
                      </div>

                      <ButtonLoading
                          submitLoad={submitBtn}
                      >
                          <div className="btn-box right">
                              <div>
                                  <button onClick={() => submitHandler("global")} className='cancel'><i className="fa-solid fa-globe"></i> Go Global</button>
                                  <button onClick={() => submitHandler("change")} className='save'><i className="fa-solid fa-bolt"></i> Change</button>
                              </div>
                          </div>
                      </ButtonLoading>

                  </form>
              </div>
          </Modal>
    </>
  )
}

export default PinModel
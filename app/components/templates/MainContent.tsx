"use client"
import React, { useState } from 'react'
import LeftMenu from './LeftMenu'
import Modal from '../temp/Modal'
import ButtonLoading from '../temp/ButtonLoading'

const MainContent = () => {
   
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [submitBtn, setSubmitBtn] = useState<boolean>(true);
    const [pinVal, setPinVal] = useState<string>("");
    
    const toggleModal = () => {
        setIsHidden(!isHidden)
    }
    const eventPin = (e: string) => {
        setPinVal(e)
    }
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitBtn(false)
        const res = await fetch("/api/others/changepin/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                pin: pinVal
            })
        })
        if(res.ok){
            const data = await res.json();
            console.log(data)
            if(data.code === 1){
                setSubmitBtn(true)
                //RELOAD ON SUCCESS
                window.location.reload();
            }
        }
    }

  return (
    <>
          <div className="col_left">

              <div>

                  <LeftMenu 
                      toggleModal={toggleModal}
                  ></LeftMenu>

              </div>

          </div>


          <Modal
              id="changePin"
              title="Change PIN Code"
              isHidden={isHidden}
              zIndex={1}
              modalClass={''}
              additionBtn={''}
              closeBtn={toggleModal}
          >

              <div id='fromForEvent' className="sign_up_form">
                  <form onSubmit={submitHandler}>

                      <p className='text-color2'>Enter Your PIN</p>

                      <div className="sign_up_one_col">
                          <div><input type={'text'} name={'pin'} placeholder={'Your PIN'}
                              onChange={(e) => eventPin(e.target.value)}
                              value={pinVal}
                              required /></div>
                      </div>

                      <ButtonLoading
                          submitLoad={submitBtn}
                      >
                          <div className="btn-box right">
                              <div>
                                  <button className='save'><i className="fa-solid fa-bolt"></i> Change</button>
                              </div>
                          </div>
                      </ButtonLoading>

                  </form>
              </div>
          </Modal>
    </>
  )
}

export default MainContent
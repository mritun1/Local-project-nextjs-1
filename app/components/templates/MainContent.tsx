"use client"
import React, { useState } from 'react'
import LeftMenu from './LeftMenu'
import PinModel from './PinModel';

const MainContent = () => {
   
    const [isHidden, setIsHidden] = useState<boolean>(false);
    
    const toggleModal = () => {
        setIsHidden(!isHidden)
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

            <PinModel
            toggleModal={toggleModal}
            isHidden={isHidden}
            ></PinModel>
          {/* <Modal
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
          </Modal> */}
    </>
  )
}

export default MainContent
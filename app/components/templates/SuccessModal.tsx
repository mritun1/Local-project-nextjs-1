import React, { MouseEventHandler } from 'react'
import Image from 'next/image'

type propsType = {
    isHidden: boolean,
    clickFunc: MouseEventHandler<HTMLButtonElement>,
}

const SuccessModal = (props: propsType) => {
    return (
        <>
            <div id="activate_success" className="modal" style={{ display: props.isHidden ? 'none' : 'block', zIndex: 999 }} >
                <div className="modal_bg"></div>
                <div className="modal_body">
                    <div className="sign_up">
                        <div className="modal_head">
                            <div >
                                <h2>Activate Success</h2>
                                <p>Welcome to Localnii.com</p>
                            </div>
                            <div>
                                <div className='close'>
                                    <button onClick={props.clickFunc} >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="sign_up_form">

                            <form>

                                <div className="sign_up_title terms" >
                                    <center><p>Your account is activated success.</p></center>
                                </div>

                                <div className="warn_board">
                                    <center>
                                        <Image
                                            src={`/icons/others/success.png`}
                                            alt='success image'
                                            width={100}
                                            height={100}
                                            
                                        />
                                    </center>
                                </div>

                                <div className="sign_up_title terms" >
                                    <center><p>Please Login.</p></center>
                                </div>

                            </form>


                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default SuccessModal
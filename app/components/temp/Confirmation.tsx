import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import ButtonLoading from './ButtonLoading'

type propsType = {
    modalState:boolean,
    modalClick:()=>void,
    modalTitle:string,
    func:()=>void
}

const Confirmation = (props:propsType) => {
    const [btnLoad,setBtnLoad] = useState<boolean>(true);
    const confirmClick = () =>{
        setBtnLoad(false);
        props.func();
    }
    return (
        <>
            <Modal
                id="confirmModal"
                title="Confirmation"
                isHidden={props.modalState}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={props.modalClick}
            >
                <div className="confirmCont">
                    <div>
                        <div>
                            <h5>{props.modalTitle}</h5>
                        </div>
                    </div>
                    <div>
                        <ButtonLoading
                            submitLoad={btnLoad}
                        >
                            <div>
                                <button onClick={confirmClick} className='confirm'><i className="fa-solid fa-circle-check"></i> Confirm</button>
                                <button onClick={props.modalClick} className='cancel'><i className="fa-solid fa-xmark"></i> Cancel</button>
                            </div>
                        </ButtonLoading>
                        
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Confirmation
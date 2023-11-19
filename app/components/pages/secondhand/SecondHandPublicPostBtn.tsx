import React, { useState } from 'react'
import Modal from '../../temp/Modal'
import SecondHandSingleEle from './SecondHandSingleEle'

type propsType = {
    name: String,
    des: String,
    contact1: number,
    contact2: number
}

const SecondHandPublicPostBtn = (props:propsType) => {
    const [modal,setModal] = useState<boolean>(false)
    const openModal = () => {
        setModal(!modal)
    }
    const [modalContact, setModalContact] = useState<boolean>(false)
    const openModalContact = () => {
        setModalContact(!modalContact)
    }
    
    return (
        <>
            <div className="secondhand_btns">
                <div>
                    <button onClick={openModal}><i className="fa-solid fa-ellipsis"></i></button>
                    <p>More</p>
                </div>
                <div>
                    <button onClick={openModalContact} ><i className="fa-solid fa-phone-volume"></i></button>
                    <p>Contact</p>
                </div>
                <div>
                    <button><i className="fa-solid fa-message"></i></button>
                    <p>Message</p>
                </div>
            </div>

            <Modal
                id="moreModal"
                title={props.name.toString()}
                isHidden={modal}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={openModal}
            >
                
                <div className='div-box'>
                    <div className="single-ele-text">
                        <p className='text-color2'>{props.des}</p>
                    </div>
                </div>
                
            </Modal>

            <Modal
                id="contact"
                title="Contact"
                isHidden={modalContact}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={openModalContact}
            >
                
                <div className='div-box'>
                    <SecondHandSingleEle 
                        content={props.contact1?.toString()}
                    ></SecondHandSingleEle>
                    <SecondHandSingleEle
                        content={props.contact2?.toString()}
                    ></SecondHandSingleEle>
                </div>

            </Modal>
        </>
    )
}

export default SecondHandPublicPostBtn
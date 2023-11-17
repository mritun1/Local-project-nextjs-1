import React, { useState } from 'react'
import Modal from '../../temp/Modal'

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
                title="More"
                isHidden={modal}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={openModal}
            >
                <h3 className='text-color2'>{props.name}</h3>
                <p className='text-color2'>{props.des}</p>
                
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
                <h3 className='text-color2'>{props.contact1}</h3>
                <p className='text-color2'>{props.contact2}</p>

                

            </Modal>
        </>
    )
}

export default SecondHandPublicPostBtn
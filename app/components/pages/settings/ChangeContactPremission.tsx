"use client"
import React, { useEffect, useState } from 'react'
import ButtonLoading from '../../temp/ButtonLoading'
import Modal from '../../temp/Modal'
interface propsType{
    dataVal:string;
    load:()=>void;
}
const ChangeContactPremission = (props:propsType) => {
    const [modalHidden, setModalHidden] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [val, setVal] = useState<string>(props.dataVal)
    const showModal = () => {
        setModalHidden(!modalHidden)
    }
    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        setLoading(false)
        const res = await fetch("/api/auth/me/update",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                contactPermission:val
            })
        });
        if(res.ok){
            showModal();
            setLoading(true);
            props.load();
        }
    }
    return (
        <>
            <div className="bar_btn_box">
                <div>
                    <div><i className="fa-solid fa-gears"></i></div>
                </div>
                <div>
                    <div><h3>Change Contact Permission</h3></div>
                </div>
                <div>
                    <div className='forward' onClick={showModal}><button ><i className="fa-solid fa-right-long"></i></button></div>
                </div>
            </div>

            <Modal
                id="changeContactPermission"
                title="Change Contact Permission"
                isHidden={modalHidden}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={showModal}
            >

                <div className="sign_up_form">
                    <form onSubmit={handleSubmit}>

                        <h3>{val}</h3>

                        <div className="sign_up_three_col">

                            <div>
                                <div>
                                    <div><div><label htmlFor={'forSell'}>For Sell</label></div></div>
                                    <div><div><input type="radio" name="permission" id={'forSell'}
                                        checked={val==="Sell"}
                                        onChange={(e) => setVal("Sell")}
                                    /></div></div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <div><div><label htmlFor={'Private'}>Private</label></div></div>
                                    <div><div><input type="radio" name="permission" id={'Private'}
                                        checked={val === "Private"}
                                        onChange={(e) => setVal("Private")}
                                    /></div></div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <div><div><label htmlFor={'Free'}>Free</label></div></div>
                                    <div><div><input type="radio" name="permission" id={'Free'}
                                        checked={val === "Free"}
                                        onChange={(e) => setVal("Free")}
                                    /></div></div>
                                </div>
                            </div>

                        </div>


                        <ButtonLoading
                            submitLoad={loading}
                        >
                            <div className="btn-box right">
                                <div>
                                    <button className='save'><i className="fa-solid fa-floppy-disk"></i> Save</button>
                                </div>
                            </div>
                        </ButtonLoading>

                    </form>
                </div>
            </Modal>
        </>
    )
}

export default ChangeContactPremission
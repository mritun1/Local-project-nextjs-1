import React, { useEffect, useState } from 'react'
import Modal from '../../temp/Modal';

interface propsType {
    itemId:string;
    itemType:string;
}

const ChatOptionBtn = (props:propsType) => {
    const [isOtions, setIsOptions] = useState<boolean>(false);
    const [isContribute, setIsContribute] = useState<boolean>(false);
    const [amount,setAmount] = useState<number | null>(null)
    const submitContribute = async () => {
        const res = await fetch("/api/contributions/msgpay/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: amount,
                itemId:props.itemId,
                itemType:props.itemType
            })
        })
        if (res.ok) {
            const data = await res.json()
            if (data.code === 1) {
                //////
                setIsContribute(false)
            }
        }
    }
    const [bal,setBal] = useState<number>(0)
    const checkBal = async () => {
        const res = await fetch("/api/wallet/check/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: 1
            })
        })
        if (res.ok) {
            const data = await res.json()
            if (data.code === 1) {
                setBal(data.bal)
                setAmount(null)
            }
        }
    }
    const clickOptions = () => {
        setIsOptions(!isOtions)
        checkBal()
    }
    const clickContribute = () => {
        setIsContribute(!isContribute)
        checkBal()
    }
    useEffect(()=>{
        checkBal()
        return () =>{}
    },[])
    return (
        <>
            <div>

                <button onClick={clickOptions}><i className="fa-solid fa-plus"></i></button>

                {isOtions?(
                    <div className="more-options-chat">
                        <div>
                            <button onClick={clickContribute} title='Contribute'><i className="fa-solid fa-indian-rupee-sign"></i></button>
                        </div>
                        {/* <div>
                        <button><i className="fa-solid fa-plus"></i></button>
                    </div> */}
                    </div>
                ):null}
                

                <Modal
                    id="contribution"
                    title="Contribution"
                    isHidden={isContribute}
                    zIndex={1}
                    modalClass={''}
                    additionBtn={''}
                    closeBtn={clickContribute}
                >
                    <div className='contributionOnMgs'>
                        
                        <div>
                            <p>Contribute to the owner</p>
                            <h3>Bal: <i className="fa-solid fa-indian-rupee-sign"></i> {bal}/-</h3>
                        </div>
                        <div>
                            <input
                                type="number"
                                name="money"
                                id="money"
                                placeholder='Amount'
                                onChange={(e) => setAmount(parseInt(e.target.value))}
                                value={amount || ''}
                            />
                        </div>
                        <div className='contributeOnMgsBtn'>
                            <button onClick={submitContribute}><i className="fa-solid fa-paper-plane"></i> Pay</button>
                        </div>
                    </div>
                </Modal>

            </div>
        </>
    )
}

export default ChatOptionBtn
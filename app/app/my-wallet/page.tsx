"use client"
import WalletMenu from '@/app/components/pages/wallet/WalletMenu'
import AlertNotice from '@/app/components/temp/AlertNotice'
import AppContent from '@/app/components/templates/AppContent'
import customDate from '@/app/lib/customDate'
import React, { useEffect, useState } from 'react'

interface transactionSchema {
    Amount: number;
    createdDate: number;
    currentBal: number;
    journal: string;
    transactionType: string;
    status: string;
}

const MyWallet = () => {

    const customD = new customDate();

    const [isTransaction, setIsTransaction] = useState<boolean>(true)
    const [isAddWallet, setIsAddWallet] = useState<boolean>(false)
    const [isWithdrawn, setIsWithdrawn] = useState<boolean>(false)

    const clickTransaction = () => {
        setIsTransaction(true);
        setIsAddWallet(false);
        setIsWithdrawn(false);
    }
    const clickAddWallet = () => {
        setIsTransaction(false);
        setIsAddWallet(true);
        setIsWithdrawn(false);
    }
    const clickWithdrawn = () => {
        setIsTransaction(false);
        setIsAddWallet(false);
        setIsWithdrawn(true);
    }

    //ADD MONEY - START
    const [addInput, setAddInput] = useState<string | undefined>('');
    const [alertHidden, setAlertHidden] = useState<boolean>(false);
    const [alertText, setAlertText] = useState<string>('');
    const addMoney = async () => {
        const res = await fetch("/api/wallet/add/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: addInput,
                journal: "adsd"
            })
        });
        if (res.ok) {
            const data = await res.json();
            if (data.code === 1) {
                setAlertHidden(true);
                setAlertText(addInput + " is Added to your wallet");
                clickTransaction();
                loadTransaction();
            } else {
                setAlertHidden(true);
                setAlertText(data.msg)
            }
        }
    }
    //ADD MONEY - END

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>, f: string) => {
        if (f === 'addInput') {
            setAddInput(e.target.value);
        }
    }

    //LOAD THE TRANSACTION - START
    const [transactionLists, setTransactionsLists] = useState<transactionSchema[]>([]);
    const [bal, setBal] = useState<number>(0);
    const [fullName, setFullName] = useState<string>('');
    const [upiId, setUpiId] = useState<string>('');
    const loadTransaction = async () => {
        const res = await fetch("/api/wallet/transactions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: 1
            })
        })
        if (res.ok) {
            const data = await res.json();
            if (data.code === 1) {
                setTransactionsLists(data.data)
                setBal(data.bal)
                setFullName(data.fullName)
                setUpiId(data.upiId)
            }
        }
    }
    //LOAD THE TRANSACTION - END

    //WITHDRAWN MONEY - START
    const [withdrawnAmount, setWithdrawnAmount] = useState<string>('');
    const [alertHidden2, setAlertHidden2] = useState<boolean>(false);
    const [alertText2, setAlertText2] = useState<string>('');
    const withDrawnClick = async () => {
        const res = await fetch("/api/wallet/withdrawn/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: withdrawnAmount,
            })
        });
        if (res.ok) {
            const data = await res.json();
            if (data.code === 1) {
                setAlertHidden2(true);
                setAlertText2(withdrawnAmount + " is added to WithDrawn, please wait for approval");
                clickTransaction();
                loadTransaction();
            } else {
                setAlertHidden2(true);
                setAlertText2(data.msg)
            }
        }
    }
    //WITHDRAWN MONEY - END

    //YOU WITHDRAWN DETAILS UPDATE - START
    const acDetailsUpdate = async () => {
        const res = await fetch("/api/wallet/update/bank/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: fullName,
                upiId: upiId
            })
        })
        if (res.ok) {
            const data = await res.json();
            console.log(data)
        }
    }
    //YOU WITHDRAWN DETAILS UPDATE - END

    //ALERT CLOSE
    const clickClose = () => {
        setAlertHidden(false);
        setAlertHidden2(false)
    }

    useEffect(() => {
        loadTransaction();
        return () => { }
    }, [])

    return (
        <>

            <AppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-sack-dollar icon-list"></i> My Wallet</h3>
                                </div>
                            </div>
                            <div>
                                {/* <!-- Some codes here --> */}
                            </div>
                        </div>

                        <div className="post_create_btns">
                            <div>
                                <div>
                                    <h5>Total Balance</h5>
                                    <h2><i className="fa-solid fNumbera-indian-rupee-sign"></i>{bal}/-</h2>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h5><i className="fa-regular fa-calendar-days"></i> {customD.currentDate('MonthName')}</h5>
                                    {/* <h2><i className="fa-solid fa-indian-rupee-sign"></i>80/-</h2> */}
                                    <h2>--</h2>
                                </div>
                            </div>
                        </div>

                        <WalletMenu
                            clickTransaction={clickTransaction}
                            clickAddWallet={clickAddWallet}
                            clickWithdrawn={clickWithdrawn}
                            isTransaction={isTransaction}
                            isAddWallet={isAddWallet}
                            isWithdrawn={isWithdrawn}
                        ></WalletMenu>

                        {alertHidden ? (
                            <AlertNotice
                                alertClass={"alert-success"}
                                text={alertText}
                                state={alertHidden}
                                clickClose={clickClose}
                            ></AlertNotice>
                        ) : null}


                        {isTransaction ? (
                            <div className="bank transaction">
                                <div className="table-bar">
                                    <div>
                                        <div>
                                            <button><i className="fa-solid fa-file-pdf"></i> Download</button>
                                        </div>
                                    </div>
                                    <div>
                                        <p>
                                            1/1
                                            <button><i className="fa-solid fa-caret-left"></i></button>
                                            <button><i className="fa-solid fa-caret-right"></i></button>
                                        </p>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Sl</th>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Journal</th>
                                            <th>Amount</th>
                                            <th>Balance</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {transactionLists ? (
                                            transactionLists.map((ele, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{customD.millisecondToString('dmy', ele.createdDate)}</td>
                                                    <td>{ele.transactionType}</td>
                                                    <td>{ele.journal}</td>
                                                    <td>{ele.Amount}/-</td>
                                                    <td>{ele.currentBal}/-</td>
                                                    <td>{ele.status}</td>
                                                </tr>
                                            ))
                                        ) : null}

                                    </tbody>
                                </table>
                            </div>
                        ) : null}

                        {isAddWallet ? (
                            <div className="bank bank_details">
                                <div className="table-bar">
                                    <div>
                                        <h5><i className="fa-solid fa-plus"></i> Add Money</h5>
                                    </div>
                                    <div>
                                        <p>
                                            <i className="fa-solid fa-indian-rupee-sign"></i>
                                        </p>
                                    </div>
                                </div>
                                <div className="single-div-center">
                                    <div>
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="Amount"
                                                onChange={(e) => changeInput(e, "addInput")}
                                                value={addInput || ''}
                                                disabled
                                            />
                                        </div>
                                        <button disabled onClick={addMoney}><i className="fa-solid fa-plus"></i> Add Money</button>
                                    </div>
                                </div>
                            </div>

                        ) : null}

                        {isWithdrawn ? (
                            <>

                                {alertHidden2 ? (
                                    <AlertNotice
                                        alertClass={"alert-danger"}
                                        text={alertText2}
                                        state={alertHidden2}
                                        clickClose={clickClose}
                                    ></AlertNotice>
                                ) : null}

                                <div className="bank bank_details">
                                    <div className="table-bar">
                                        <div>
                                            <h5>Withdraw</h5>
                                        </div>
                                        <div>
                                            <p>
                                                <i className="fa-solid fa-indian-rupee-sign"></i>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="single-div-center">
                                        <div>
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Amount"
                                                    onChange={(e) => setWithdrawnAmount(e.target.value)}
                                                    value={withdrawnAmount}
                                                />
                                            </div>
                                            <button onClick={withDrawnClick}>Withdraw</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bank bank_details">
                                    <div className="table-bar">
                                        <div>
                                            <h5>Bank Details</h5>
                                        </div>
                                        <div>
                                            <p>
                                                <i className="fa-solid fa-indian-rupee-sign"></i>
                                            </p>
                                        </div>
                                    </div>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        placeholder='Full Name'
                                                        style={{ width: `96%` }}
                                                        onKeyUp={() => acDetailsUpdate()}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        value={fullName}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>UPI ID</td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        placeholder='UPI ID'
                                                        style={{ width: `96%` }}
                                                        onKeyUp={() => acDetailsUpdate()}
                                                        onChange={(e) => setUpiId(e.target.value)}
                                                        value={upiId}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : null}


                    </div>
                }
                rightBar={``}
            ></AppContent>

        </>
    )
}

export default MyWallet


import React from 'react'
interface propsType {
    clickTransaction: () => void;
    clickAddWallet:()=>void;
    clickWithdrawn: () => void;
    isTransaction: boolean;
    isAddWallet:boolean;
    isWithdrawn: boolean;
}
const WalletMenu = (props:propsType) => {
    return (
        <>
            <div className="tab_menu">
                <div className={`${props.isTransaction ? 'active' : null}`}>
                    <h5 onClick={props.clickTransaction}><i className="fa-solid fa-clipboard-list"></i> Transactions</h5>
                </div>
                <div className={`${props.isAddWallet ? 'active' : null}`}>
                    <h5 onClick={props.clickAddWallet}><i className="fa-solid fa-plus"></i> Add Money</h5>
                </div>
                <div className={`${props.isWithdrawn ? 'active' : null}`}>
                    <h5 onClick={props.clickWithdrawn}><i className="fa-solid fa-indian-rupee-sign"></i> Withdraw</h5>
                </div>
            </div>
        </>
    )
}

export default WalletMenu
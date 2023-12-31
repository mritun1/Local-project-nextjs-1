"use client"
import AdminModal from '@/app/components/admin/temp/AdminModal';
import React, { useEffect, useState } from 'react'
interface Lists {
    item: {
        Amount: number;
        createdDate: number;
        currentBal: number;
        status: string;
        transactionType: string;
        userId: string;
        journal: string;
        _id: string;
    },
    userName: string;
    upiFullName: string;
    upiId: string;
    mobile: number;
    uId: string;
}
const Page = () => {
    const [lists, setLists] = useState<Lists[]>([])
    const [totalAmount, setTotalAmount] = useState<number>(0)
    useEffect(() => {
        const Fetch = async () => {
            const res = await fetch("/api/admin/withdrawn/", {
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
                if (data.data) {
                    setLists(data.data)
                    setTotalAmount(data.totalAmount)
                    console.log(data)
                }
            }
        }
        Fetch();
    }, [totalAmount])

    const [modalShow,setModalShow] = useState<boolean>(false);
    const [action,setAction] = useState<string>('');
    const [journal,setJournal] = useState<string>('');
    const [notification,setNotification] = useState<string>('');
    const [uId,setUID] = useState<string>('');

    const modalClickHandler = (e: string) => {
        setModalShow(!modalShow)
        setUID(e)
    }

    const statusUpdateHandler = async (e:any) =>{
        e.preventDefault();
        const res = await fetch("/api/admin/withdrawn/approved/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: uId,
                status: action,
                journal,
                notification
            })
        })
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            window.location.reload()
        }
    }

    return (
        <div>
            <div key={1}>
                <a href="/admin/"><button>Go Back</button></a>
                <h1>
                    | Withdrawn Lists | Total: {totalAmount}
                </h1>
            </div>

            <div key={2}>
                <table className='admin_table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>User Name</th>
                            <th>Mobile</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>status</th>
                            <th>Journal</th>
                            <th>UPI Data</th>
                            <th>Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists.map((ele, index) => (
                            <tr key={index}>
                                <td>{ele.item.createdDate}</td>
                                <td>
                                    <a href={`/admin/transactions/${ele.uId}`} target='_blank'>{ele.userName}</a>
                                </td>
                                <td>{ele.mobile}</td>
                                <td>{ele.item.Amount}</td>
                                <td>{ele.item.transactionType}</td>
                                <td>{ele.item.status}</td>
                                <td>{ele.item.journal}</td>
                                <td>
                                    <p>{ele.upiFullName}</p>
                                    <p>{ele.upiId}</p>
                                </td>
                                <td>
                                    <div>
                                        <button onClick={(e)=>modalClickHandler(ele.uId)} className='btn paidBtn'>Change Status</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AdminModal
                title='WithDrawn Status'
                modalShow={modalShow}
                uId={uId}
                modalClickHandler={(e)=>modalClickHandler(uId)}
            >
                <form onSubmit={statusUpdateHandler}>
                    <p><b>Action</b></p>
                    <p>
                        <label htmlFor="Success">Success</label>
                        <input 
                        className='adminInput' 
                        type="radio" 
                        name="action" 
                        value={'Success'} 
                        id='Success' 
                        onChange={(e)=>setAction(e.target.value)}
                        />

                        <label htmlFor="Rejected">Rejected</label>
                        <input 
                        className='adminInput' 
                        type="radio" 
                        name="action" 
                        value={'Rejected'} 
                        id='Rejected' 
                        onChange={(e) => setAction(e.target.value)}
                        />
                    </p>

                    <p><b>Journal</b></p>
                    <input 
                    className='adminInput' 
                    type="text" 
                    name="journal" 
                        onChange={(e) => setJournal(e.target.value)}
                        value={journal}
                    />

                    <p><b>Notification</b></p>
                    <textarea 
                    className='adminInput' 
                    name="notification" 
                    cols={20} 
                    rows={2}
                        onChange={(e) => setNotification(e.target.value)}
                        value={notification}
                    ></textarea>
                    
                    <br/>
                    <button type='submit' className='btn paidBtn'>Submit</button>
                </form>
            </AdminModal>

        </div>
    )
}

export default Page
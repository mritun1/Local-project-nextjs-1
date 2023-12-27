"use client"
import React, { useEffect, useState } from 'react'
interface Lists {
    item:{
        Amount: number;
        createdDate: number;
        currentBal: number;
        status: string;
        transactionType: string;
        userId: string;
        journal: string;
        _id: string;
    },
    userName:string;
    upiFullName: string;
    upiId: string;
    mobile: number;
    uId: string;
}
const Page = () => {
    const [lists, setLists] = useState<Lists[]>([])
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
                setLists(data.data)
                console.log(data)
            }
        }
        Fetch();
    }, [])

    const paidHandler =async (e:string,s:string) =>{
        if (confirm('Are you sure ABOUT PAID?')){
            let journal = prompt("Journal");
            const res = await fetch("/api/admin/withdrawn/approved/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id:e,
                    status:s,
                    journal
                })
            })
            if(res.ok){
                const data = await res.json();
                console.log(data)
                window.location.reload()
            }
        }
    }

    return (
        <div>
            <div>
                <a href=""><button>Go Back</button></a>
                <h1>
                    | Withdrawn Lists
                </h1>
            </div>

            <div >
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
                                        <button onClick={() => paidHandler(ele.item._id, 'Success')} className='btn paidBtn'>Paid</button>
                                        <button onClick={() => paidHandler(ele.item._id, 'Pending')} className='btn unpaid'>UnPaid</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Page
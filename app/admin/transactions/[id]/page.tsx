"use client"
import customDate from '@/app/lib/customDate';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
interface transactionSchema {
    Amount: number;
    createdDate: number;
    currentBal: number;
    journal: string;
    transactionType: string;
    status: string;
}
const Page = () => {
    const router = useParams()
    const { id } = router

    const customD = new customDate();
    
    const [transactionLists, setTransactionsLists] = useState<transactionSchema[]>([]);
    const [fullName, setFullName] = useState<string>('');
    useEffect(() => {
        const Fetch = async () => {
            const res = await fetch("/api/admin/withdrawn/transactions/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uId: id
                })
            })
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                if (data.code === 1) {
                    setTransactionsLists(data.data)
                    setFullName(data.fullName)
                }
            }
        }
        Fetch();
    }, [id])

    return (
        <div>
            <div>
                <a href="/admin/withdrawn/" ><button>Go Back</button></a>
                <h1>
                    | {fullName} Transactions | <a href={`/admin/ref/${id}`} target='_blank'>Check Referral</a>
                </h1>
            </div>

            <div >
                <table className='admin_table'>
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Journal</th>
                            <th>Amount</th>
                            <th>Current Bal</th>
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

        </div>
    )
}

export default Page
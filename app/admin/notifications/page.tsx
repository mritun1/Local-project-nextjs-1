"use client"
import AdminModal from '@/app/components/admin/temp/AdminModal';
import React, { useEffect, useState } from 'react';
interface items {
    createdDate: number;
    message: string;
    notificationType: string;
    seen: number;
    sendType: string;
    userId: string;
    _id: string;
}
const Page = () => {
    const [notificationLists, setNotificationLists] = useState<items[]>([]);
    useEffect(() => {
        const Fetch = async () => {
            const res = await fetch("/api/admin/notifications/all/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code:1
                })
            })
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                if (data.code === 1) {
                    setNotificationLists(data.data)
                }
            }
        }
        Fetch();
    }, [])

    const [modalShow, setModalShow] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>('');

    const modalClickHandler = () => {
        setModalShow(!modalShow)
    }
    const notificationHandler = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/admin/notifications/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
            <div key={1} id='a1'>
                <h1>Notifications <button className='btn paidBtn' onClick={modalClickHandler}>Add Notification</button></h1>
            </div>
            <div key={2} id='a2'>
                <table className='admin_table'>
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Date</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notificationLists.map((ele,index)=>(
                            <tr key={index}>
                                <td>0</td>
                                <td>{ele.createdDate}</td>
                                <td>{ele.message}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>

            <AdminModal
                title='Send some notifications'
                modalShow={modalShow}
                uId={''}
                modalClickHandler={(e) => modalClickHandler()}
            >
                <form onSubmit={notificationHandler}>
                
                    <p><b>Notification</b></p>
                    <textarea
                        className='adminInput'
                        name="notification"
                        cols={20}
                        rows={2}
                        onChange={(e) => setNotification(e.target.value)}
                        value={notification}
                    ></textarea>

                    <br />
                    <button type='submit' className='btn paidBtn'>Submit</button>
                </form>
            </AdminModal>
        </div>
    );
};

export default Page;


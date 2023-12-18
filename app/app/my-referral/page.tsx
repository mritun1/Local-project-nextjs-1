"use client"
import AppContent from '@/app/components/templates/AppContent'
import React, { useEffect, useState } from 'react'
import copy from 'clipboard-copy'
import AlertNotice from '@/app/components/temp/AlertNotice';
import Link from 'next/link';

interface items {
    firstName:string;
    lastName:string;
    refPaid:number;
    _id:string;
}

const Page = () => {
    const [refID,setRefID] = useState<string>("")
    const [items, setItems] = useState <items[]>([])
    const [length, setLength] = useState<number>(0)
    const [totalPaid,setTotalPaid] = useState<number>(0)
    const [totalUnPaid, setTotalUnPaid] = useState<number>(0)
    const [isCopyLink,setIsCopyLink] = useState<boolean>(false)

    const copyLinkHandle = async (e:string) =>{
        await copy(e);
        setIsCopyLink(true);
        setTimeout(()=>setIsCopyLink(false),1500);
    }

    useEffect(() => {
        const loadCont = async () => {
            const res = await fetch("/api/referral/", {
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
                console.log(data)
                if(data.code===1){
                    setRefID(data.uId)
                    setItems(data.data)
                    setLength(data.length)
                    setTotalPaid(data.totalPaid)
                    setTotalUnPaid(data.totalUnPaid)
                }
            }
        }
        loadCont();
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
                                    <h3><i className="fa-solid fa-users-rays icon-list"></i> My Referral</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <!-- Some code here --> */}
                                </div>
                            </div>
                        </div>

                        {/* <div className="service-not-available">
                            <div>
                                <h2><i className="fa-regular fa-hourglass-half"></i></h2>
                                <h3>Coming Soon! Please wait for some more days.</h3>
                                <h1>Thank You.</h1>
                            </div>
                        </div> */}

                        <div className="referral_box">
                            <div>
                                <h3>Referral Link</h3>
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Referral Link" 
                                    value={"https://localnii.com/page/register/" +refID}
                                    onChange={()=>{}}
                                />
                            </div>
                            <div>
                                {isCopyLink?(
                                    <button><i className="fa-solid fa-copy"></i> Copied</button>
                                ):(
                                    <button onClick={() => copyLinkHandle("https://localnii.com/page/register/" + refID)}><i className="fa-solid fa-copy"></i> Copy</button>
                                )}
                                
                                <button><i className="fa-solid fa-share"></i> Share</button>
                            </div>
                        </div>

                        <div className="details_list">
                            <div>
                                <p>Total: <b>{length}</b></p>
                            </div>
                            <div>
                                <p>Paid: <b>{totalPaid}</b></p>
                            </div>
                            <div>
                                <p>unPaid: <b>{totalUnPaid}</b></p>
                            </div>
                        </div>

                        <AlertNotice
                            alertClass={"alert-danger"}
                            text={"Unpaid means that your downline account is not activated. Please tell him to activate it."}
                            state={true}
                            clickClose={()=>{}}
                        ></AlertNotice>

                        <div className="bank transaction">
                            <h4 className='text-color'>Earn Rs.50/- per refer.</h4>
                            <div className="table-bar">
                                <div>
                                    <div>
                                        <h3 className="text-color2">Downline</h3>
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
                                        <th>Full Name</th>
                                        <th>Paid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {length>0?(
                                        items.map((ele,index)=>(
                                            <tr key={index}>
                                                <td>1</td>
                                                <td>
                                                    <Link href={"/page/people/" + ele._id + "/" + ele.firstName + " " + ele.lastName}>{ele.firstName + ' ' + ele.lastName}</Link>
                                                </td>
                                                {ele.refPaid>0?(
                                                    <td><i className="fa-solid fa-indian-rupee"></i> {ele.refPaid}</td>
                                                ):(
                                                    <td>unPaid</td>
                                                )}
                                                
                                            </tr>
                                        ))
                                    ):null}
                                </tbody>
                            </table>
                        </div>

                    </div>
                }
                rightBar={``}
            ></AppContent>

        </>
    )
}

export default Page
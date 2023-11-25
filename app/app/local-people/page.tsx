"use client"
import AppContent from '@/app/components/templates/AppContent'
import seenUpdate from '@/app/customlib/seenUpdate';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface catAr {
    _id:string;
    count:number;
}

const LocalPeoples = () => {

    const pathname = usePathname();
    const [categories, setCategories] = useState<catAr[]>([])
    const [total,setTotal] = useState<number>(0)
    const [pin,setPin] = useState<number>(0)

    const getData = async () =>{
        const res = await fetch("/api/people/categories/all/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                code:1
            })
        })
        if(res.ok){
            const data = await res.json();
            setCategories(data.data)
            setTotal(data.allTotal)
            setPin(data.pin)
        }
    }

    useEffect(() => {
        const seenUpdater = new seenUpdate();
        seenUpdater.update(pathname);
        return () => {};
    }, [pathname]);

    useEffect(() => {
        getData();
        return () => {};
    }, []);

    return (
        <>


            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-users icon-list"></i> Local People</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>{pin} <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        <div className="categories_lists">

                            <div>
                                <Link href="/app/local-people-cat/all">
                                    <div style={{width:`100px`}}>
                                        <h3>All</h3>
                                        <button>{total}</button>
                                    </div>
                                </Link>
                            </div>

                            {categories.map((ele,index)=>(
                                <div key={index}>
                                    <Link href={"/app/local-people-cat/" + ele._id }>
                                        <div>
                                            <h3>{ele._id}</h3>
                                            <button>{ele.count}</button>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                        </div>

                    </div>
                }
                rightBar={``}
            ></AppContent>

        </>
    )
}

export default LocalPeoples
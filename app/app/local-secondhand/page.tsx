"use client"
import AppContent from '@/app/components/templates/AppContent'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface catAr {
    _id: {
        productCategory:string;
        productCatName:string;
    };
    count: number;
}
const LocalSecondHand = () => {

    const pathname = usePathname();
    const [categories, setCategories] = useState<catAr[]>([])
    const [total, setTotal] = useState<number>(0)
    const [pin, setPin] = useState<number>(0)

    const getData = async () => {
        const res = await fetch("/api/products/categories/all/", {
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
            setCategories(data.data)
            setTotal(data.allTotal)
            setPin(data.pin)
        }
    }

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
                                    <h3><i className="fa-solid fa-tag"></i> Secondhand ({total})</h3>
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
                                <Link href="/app/local-secondhand-cat/all">
                                    <div style={{ width: `100px` }}>
                                        <h3>All</h3>
                                        <button>{total}</button>
                                    </div>
                                </Link>
                            </div>

                            {categories.map((ele, index) => (
                                <div key={index}>
                                    <Link href={"/app/local-secondhand-cat/" + ele._id.productCategory}>
                                        <div>
                                            <h3>{ele._id.productCatName}</h3>
                                            <button>{ele.count}</button>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                        </div>

                        <br /><br /><br /><br />


                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default LocalSecondHand
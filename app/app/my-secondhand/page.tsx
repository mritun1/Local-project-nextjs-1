"use client"
import AddSecondHand from '@/app/components/pages/secondhand/AddSecondHand'
import SecondHandPosts from '@/app/components/pages/secondhand/SecondHandPosts';
import AppContent from '@/app/components/templates/AppContent'
import customDate from '@/app/lib/customDate';
import React, { useEffect, useState } from 'react'

interface products {
    contact2:Number;
    createdDate:number;
    images:[];
    productCategory:String;
    productDes:String;
    productName:String;
    productOld:String;
    productPin:Number;
    productPrice:Number;
    updatedDate:Number;
    userId:String;
    _id:String;
}

const Page = () => {

    const [notFound, setNotFound] = useState<boolean>(false);
    const [products, setProducts] = useState<Array<products>>([]);
    const newDate = new customDate();
    const [pin, setPin] = useState<string>("")
    const [total, setTotal] = useState<number>(0)

    const loadCont = async () =>{
        const res = await fetch("/api/products/second-hand/admin/lists/")
        if(res.ok){
            const data = await res.json();
            setPin(data.pin)
            setProducts(data.data)
            setTotal(data.total)
            if (data.data.length > 0) {
                setNotFound(true)
            } 
        }
    }

    useEffect(()=>{
        return () => {
            loadCont()
        }
    },[])

    return (
        <>

            <AppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-recycle icon-list"></i> My Secondhand</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>{pin} <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        
                        <AddSecondHand></AddSecondHand>


                        <div className="tab_menu">
                            <div>
                                <h3>{total}</h3>
                                <p>Total</p>
                            </div>
                            <div>
                                <h3>0</h3>
                                <p>Sold</p>
                            </div>
                            <div>
                                <h3>0</h3>
                                <p>Reported</p>
                            </div>
                        </div>

                        

                        {notFound ? (
                            products?.map((ele, index) => (
                                <SecondHandPosts
                                    key={index}
                                    index={index}
                                    createdDate={newDate.millisecondToString("dmy", ele.createdDate)}
                                    productName={ele.productName}
                                    loadCont={loadCont}
                                    id={ele._id.toString()}
                                />
                            ))
                        ) : (
                            <div className="service-not-available">
                                <div>
                                    <h2><i className="fa-solid fa-triangle-exclamation"></i></h2>
                                    <h3>Sorry! No content Found.</h3>
                                </div>
                            </div>
                        )}

                    </div>
                }
                rightBar={``}
            ></AppContent>

        </>
    )
}

export default Page
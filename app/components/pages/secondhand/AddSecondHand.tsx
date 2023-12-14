"use client"
import React, { useEffect, useState } from 'react'
import ButtonLoading from '../../temp/ButtonLoading'
import ImageInput from '../../temp/ImageInput'
import Modal from '../../temp/Modal'
import axios from 'axios'

interface productCat {
    categoryName: string,
    categorySlug: string
}

const AddSecondHand = () => {

    const [productCat, setProductCat] = useState<Array<productCat>>()
    const [productName, setProductName] = useState<string>("")
    const [productDes, setProductDes] = useState<string>("")
    const [productOld, setProductOld] = useState<string>("")
    const [productCategory, setProductCategory] = useState<string>("")
    const [productPrice, setProductPrice] = useState<number | null>(null)
    const [contact1, setContact1] = useState<number | null>(null)
    const [contact2, setContact2] = useState<number | null>(null)
    const [pin, setPin] = useState<number | null>(null)
    const [modal, setModal] = useState<boolean>(false)
    const [imgLists, setImgLists] = useState<Array<string>>([])
    const [id, setId] = useState<string>("")

    //CHECK AND CREATE DRAFT POST
    const checkCreateDraft = async (url: string) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                check: "checking"
            })
        })
        return res
    }

    const openModal = async () => {
        setModal(!modal)
        try {
            const res = await checkCreateDraft("/api/products/second-hand/draft/");

            if (res.ok) {
                const data = await res.json();
                console.log(data)
                if (data && data.res && data.res.productName) {
                    setProductName(data.res.productName);
                }
                if (data && data.res && data.res.productDes) {
                    setProductDes(data.res.productDes);
                }
                if (data && data.res && data.res.productPrice) {
                    setProductPrice(data.res.productPrice);
                }
                if (data && data.res && data.res.productOld) {
                    setProductOld(data.res.productOld);
                }
                if (data && data.res && data.res.contact1) {
                    setContact1(data.res.contact1);
                }
                if (data && data.res && data.res.contact2) {
                    setContact2(data.res.contact2);
                }
                if (data && data.res && data.res.productCategory) {
                    setProductCategory(data.res.productCategory);
                }
                if (data && data.res && data.res.images) {
                    setImgLists(data.res.images);
                }
                if (data && data.res && data.res._id) {
                    setId(data.res._id);
                }

            } else {
                console.log("Response not OK.");
            }
        } catch (error) {
            console.error("Error in fetching or parsing the response:", error);
        }
    }

    useEffect(() => {

        //FETCH Product Categories
        const productCatFetch = async () => {
            const res = await fetch("/api/products/categories",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    code:1
                })
            })
            if (res.ok) {
                const data = await res.json();
                setProductCat(data.json)
                setContact1(data.mobile)
                setPin(data.pin)
            }
        }

        productCatFetch();
        return () => {}

    }, [])

    //Update to draft
    const eventUpdate = async (e: any, f: string) => {
        const val = e.target.value
        if (f === "productName") { setProductName(val) }
        if (f === "productDes") { setProductDes(val) }
        if (f === "productPrice") { setProductPrice(val) }
        if (f === "productOld") { setProductOld(val) }
        if (f === "contact1") { setContact1(val) }
        if (f === "contact2") { setContact2(val) }
        if (f === "productCategory") { setProductCategory(val) }
        const res = await fetch("/api/products/second-hand/update/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                [f]: val
            })
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
        } else {
            console.log("Something error, while creating draft post")
        }
    }

    const [imgUploadNum1, setImgUploadNum1] = useState<string>('0')
    let source = axios.CancelToken.source();
    const [imgUploadState1, setImgUploadState1] = useState<boolean>(true)
    const newsImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        source.cancel(); // Cancel the previous request, if any
        source = axios.CancelToken.source();
        const fileObj = e.target.files?.[0]
        if (fileObj) {
            setImgUploadState1(!imgUploadState1);
            const formData = new FormData();
            formData.set("imgFile", fileObj)
            formData.set("service", "secondHand")
            formData.set("serviceType", 'draft')
            formData.set("postId", id.toString())

            axios.post("/api/image/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (event) => {
                    if (event.total !== undefined) {
                        const progress = (event.loaded / event.total) * 100;
                        setImgUploadNum1(Math.round(progress).toString());
                    }
                },
                cancelToken: source.token,
            })
                .then((response) => {
                    setImgUploadState1(true);
                    setImgLists([...imgLists, response.data.image]);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }
    }

    const [submitBtn, setSubmitBtn] = useState<boolean>(true)
    //SUBMIT CREATE
    const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
        setSubmitBtn(false)
        const res = await fetch("/api/products/second-hand/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: "create"
            })
        })
        if (res.ok) {
            setSubmitBtn(true)
            const data = await res.json()
            // console.log(data)
            setProductName("")
            setProductDes("")
            setProductPrice(null)
            setProductOld("")
            setProductCategory("")
            setContact1(null)
            setContact2(null)

        } else {
            console.log("something went wrong")
        }
    }

    return (
        <>
            <div className="post_create_btns">
                <div>
                    <div>
                        <h5>Add Secondhand Product</h5>
                        <button onClick={openModal} ><i className="fa-solid fa-plus"></i> Create Product</button>
                    </div>
                </div>
                <div>
                    <div>
                        <h5>Earned</h5>
                        <h2><i className="fa-solid fa-indian-rupee-sign"></i>0/-</h2>
                    </div>
                </div>
            </div>


            <Modal
                id="addSecondHand"
                title="Add SecondHand"
                isHidden={modal}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={openModal}
            >

                <div id='fromForEvent' className="sign_up_form">
                    <form onSubmit={(e) => submitPost(e)}>

                        <p className='text-color'>Your Product Info</p>

                        <div className="sign_up_one_col">
                            <div>
                                <input type={'text'} name={'productName'} placeholder={'Product Name'}
                                onChange={(e) => eventUpdate(e, "productName")}
                                value={productName}
                                required />
                            </div>
                        </div>

                        <div className="sign_up_one_col" >
                            <div style={{ height: `100px` }}>
                                <textarea name={'productDes'} placeholder={'Tell me why you want to sell and how is the condition of product?'}
                                onChange={(e) => { eventUpdate(e, "productDes") }}
                                value={productDes}
                                required ></textarea>
                            </div>
                        </div>

                        <div className="sign_up_two_col">
                            <div>
                                <div>
                                    <input type="number" name="productPrice" placeholder="Price in Rupees" required
                                    value={productPrice?.toString()}
                                    onChange={(e) => { eventUpdate(e, "productPrice") }}
                                />
                                </div>
                            </div>
                            <div>
                                <div><input type="text" name="productOld" placeholder="How old is product?"
                                    value={productOld}
                                    onChange={(e) => { eventUpdate(e, "productOld") }}
                                    required /></div>
                            </div>
                        </div>

                        <div className="sign_up_one_col">
                            <div>
                                <select
                                    name="category"
                                    id="productCategory"
                                    onChange={(e) => { eventUpdate(e, "productCategory") }}
                                    value={productCategory}
                                >
                                    {productCat?.map((ele, index) => (
                                        <option key={index} value={ele.categorySlug}>{ele.categoryName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <p className='text-color'>Your Contact Info</p>

                        <div className="sign_up_one_col">
                            <div><input type={'number'} name={'mobileNum1'} placeholder={'Mobile Number 1'}
                                onChange={(e) => { eventUpdate(e, "contact1") }}
                                value={contact1 ? contact1.toString() : 0 }
                                required /></div>
                        </div>

                        <div className="sign_up_one_col">
                            <div><input type={'number'} name={'mobileNum2'} placeholder={'Mobile Number 2'}
                                onChange={(e) => { eventUpdate(e, "contact2") }}
                                value={contact2?.toString()}
                            /></div>
                        </div>

                        <p className='text-color'>Your Product Images</p>

                        <ImageInput
                            key="imgForDraft"
                            service={"secondHand"}
                            imgLists={imgLists}
                            serviceFor='draft'
                            postId={id}
                            pWidth={imgUploadNum1}
                            pDisplay={imgUploadState1}
                            uploadImg={newsImgUpload}
                        ></ImageInput>

                        <p className='text-color'>Pin: {pin}</p>

                        <ButtonLoading
                            submitLoad={submitBtn}
                        >
                            <div className="btn-box right">
                                <div>
                                    <button className='save'><i className="fa-solid fa-plus"></i> Create</button>
                                </div>
                            </div>
                        </ButtonLoading>

                    </form>
                </div>
            </Modal>
        </>
    )
}

export default AddSecondHand
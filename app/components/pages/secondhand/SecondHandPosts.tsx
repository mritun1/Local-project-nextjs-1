"use client"
import React, { useEffect, useState } from 'react'
import Modal from '../../temp/Modal'
import ImageInput from '../../temp/ImageInput'
import ButtonLoading from '../../temp/ButtonLoading'
import axios from 'axios'
import Confirmation from '../../temp/Confirmation'
type typePros = {
    index:number,
    createdDate:String,
    productName:String,
    id: string,
    loadCont: () => void
}
interface productCat {
    categoryName: string,
    categorySlug: string
}
const SecondHandPosts = (props:typePros) => {
    const [productCat, setProductCat] = useState<Array<productCat>>()
    const [productName, setProductName] = useState<string>("")
    const [productDes, setProductDes] = useState<string>("")
    const [productPin, setProductPin] = useState<number | null>(null)
    const [productOld, setProductOld] = useState<string>("")
    const [productCategory, setProductCategory] = useState<string>("")
    const [productPrice, setProductPrice] = useState<number | null>(null)
    const [contact1, setContact1] = useState<number | null>(null)
    const [contact2, setContact2] = useState<number | null>(null)
    const [modal, setModal] = useState<boolean>(false)
    const [imgLists, setImgLists] = useState<Array<string>>([])

    const openModal = async () => {
        setModal(!modal)
        try {
            const res = await fetch("/api/products/second-hand/"+props.id+"/");

            if (res.ok) {
                const data = await res.json();
                if (data && data.data[0] && data.data[0].productName) {
                    setProductName(data.data[0].productName);
                }
                if (data && data.data[0] && data.data[0].productDes) {
                    setProductDes(data.data[0].productDes);
                }
                if (data && data.data[0] && data.data[0].productPrice) {
                    setProductPrice(data.data[0].productPrice);
                }
                if (data && data.data[0] && data.data[0].productOld) {
                    setProductOld(data.data[0].productOld);
                }
                if (data && data.data[0] && data.data[0].contact1) {
                    setContact1(data.data[0].contact1);
                }
                if (data && data.data[0] && data.data[0].contact2) {
                    setContact2(data.data[0].contact2);
                }
                if (data && data.data[0] && data.data[0].productCategory) {
                    setProductCategory(data.data[0].productCategory);
                }
                if (data && data.data[0] && data.data[0].images) {
                    setImgLists(data.data[0].images);
                }
                if (data && data.data[0] && data.data[0].productPin) {
                    setProductPin(data.data[0].productPin);
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
            const res = await fetch("/api/products/categories")
            if (res.ok) {
                const data = await res.json();
                setProductCat(data.data)
            }
        }

        return () => {
            productCatFetch()
        }

    }, [])

    const [submitBtn, setSubmitBtn] = useState<boolean>(true)
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
            formData.set("serviceType", 'published')
            formData.set("postId", props.id.toString())

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

    const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitBtn(!submitBtn)
        const res = await fetch("/api/products/second-hand/create/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: props.id,
                productName,
                productDes,
                productPrice,
                productOld,
                contact1,
                contact2,
                productCategory
            })
        })
        if (res.ok) {
            const data = await res.json();
            props.loadCont();
            setModal(!modal)
        } else {
            console.log("Error, while getting updating");
        }
        setSubmitBtn(true);
    }

    const [delModal, setDelModal] = useState<boolean>(false);
    const clickDelModal = () => {
        setDelModal(!delModal);
    }

    const delFetch = async (url: string) => {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: props.id,
                postType: "SecondHand"
            }),
        })
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            setDelModal(!delModal);
            props.loadCont();
        } else {
            console.log("Error, while Deleting");
        }
    }

    const delFunc = async () => {
        await delFetch("/api/posts/delete/");
    }

  return (
    <>
        <div key={props.index} className="post_box">
              <div>
                  <div>
                      <p>{props.createdDate}</p>
                  </div>
                  <div>
                      <button>Published</button>
                  </div>
              </div>
              <div>
                  <h4>{props.productName}</h4>
              </div>
              <div>
                  <div>
                      <p>Second Hand</p>
                  </div>
                  <div>
                      <button onClick={openModal} className="edit"><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                      <button onClick={() => clickDelModal()} className="del"><i className="fa-solid fa-trash"></i> Delete</button>
                      <button className="view"><i className="fa-solid fa-eye"></i> preview</button>
                  </div>
              </div>
          </div>

          <Confirmation
              key={props.id.toString()}
              modalTitle='Are you sure to delete?'
              modalState={delModal}
              modalClick={clickDelModal}
              func={delFunc}
          ></Confirmation>


          <Modal
              id="addSecondHandEdit"
              title="Edit SecondHand"
              isHidden={modal}
              zIndex={1}
              modalClass={''}
              additionBtn={''}
              closeBtn={openModal}
          >

              <div id='fromForEvent' className="sign_up_form">
                  <form onSubmit={(e) => submitPost(e)}>

                      <p className='text-color2'>Your Product Info</p>

                      <div className="sign_up_one_col">
                          <div><input type={'text'} name={'productName'} placeholder={'Product Name'}
                              onChange={(e) => setProductName(e.target.value)}
                              value={productName}
                              required /></div>
                      </div>

                      <div className="sign_up_one_col" >
                          <div style={{ height: `100px` }}><textarea name={'productDes'} placeholder={'Tell me why you want to sell and how is the condition of product?'}
                              onChange={(e) => { setProductDes(e.target.value) }}
                              value={productDes}
                              required ></textarea></div>
                      </div>

                      <div className="sign_up_two_col">
                          <div>
                              <div><input type="number" name="productPrice" placeholder="Price in Rupees" required
                                  value={productPrice?.toString()}
                                  onChange={(e) => { setProductPrice(parseInt(e.target.value)) }}
                              /></div>
                          </div>
                          <div>
                              <div><input type="text" name="productOld" placeholder="How old is product?"
                                  value={productOld}
                                  onChange={(e) => { setProductOld(e.target.value) }}
                                  required /></div>
                          </div>
                      </div>

                      <div className="sign_up_one_col">
                          <div>
                              <select
                                  name="category"
                                  id="productCategory"
                                  onChange={(e) => { setProductCategory(e.target.value) }}
                                  value={productCategory}
                              >
                                  {productCat?.map((ele, index) => (
                                      <option key={index} value={ele.categorySlug}>{ele.categoryName}</option>
                                  ))}
                              </select>
                          </div>
                      </div>

                      <p className='text-color2'>Your Contact Info</p>

                      <div className="sign_up_one_col">
                          <div><input type={'number'} name={'mobileNum1'} placeholder={'Mobile Number 1'}
                              onChange={(e) => { setContact1(parseInt(e.target.value)) }}
                              value={contact1?.toString()}
                              required /></div>
                      </div>

                      <div className="sign_up_one_col">
                          <div><input type={'number'} name={'mobileNum2'} placeholder={'Mobile Number 2'}
                              onChange={(e) => { setContact2(parseInt(e.target.value)) }}
                              value={contact2?.toString()}
                               /></div>
                      </div>

                      <p className='text-color2'>Your Product Images</p>

                      <ImageInput
                          key="imgForDraft"
                          service={"secondHand"}
                          imgLists={imgLists}
                          serviceFor='draft'
                          postId={props.id}
                          pWidth={imgUploadNum1}
                          pDisplay={imgUploadState1}
                          uploadImg={newsImgUpload}
                      ></ImageInput>

                      <p className='text-color2'>Pin: {productPin}</p>

                      <ButtonLoading
                          submitLoad={submitBtn}
                      >
                          <div className="btn-box right">
                              <div>
                                  <button className='save'><i className="fa-solid fa-floppy-disk"></i> Update</button>
                              </div>
                          </div>
                      </ButtonLoading>

                  </form>
              </div>
          </Modal>
    </>
  )
}

export default SecondHandPosts
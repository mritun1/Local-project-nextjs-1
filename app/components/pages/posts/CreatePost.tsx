"use client"
import React, { useState } from 'react'
import Modal from '../../temp/Modal'
import Alerts3 from '../../temp/Alerts3'
import ButtonLoading from '../../temp/ButtonLoading'

const CreatePost = () => {
    const [modalHidden, setModalHidden] = useState<boolean>(false)
    const showModal = async () => {
        setModalHidden(!modalHidden)
        
    }

    const [modalEventHidden,setModalEventHidden] = useState<boolean>(false)
    const showEventModal = () =>{
        setModalEventHidden(!modalEventHidden)
    }

    const [alertClass, setAlertClass] = useState<string>("danger")
    const [msg, setMsg] = useState<string>("")
    const [alert, setAlert] = useState<boolean>(false)
    const [submitBtn, setSubmitBtn] = useState<boolean>(true)
    const [newsTitle, setNewsTitle] = useState<string>("")
    const [newsDes, setNewsDes] = useState<string>("")
    const closeAlert = () => {
        setAlert(!alert)
    }

    const [eventTitle,setEventTitle] = useState<string>("")
    const [eventDes,setEventDes] = useState<string>("")

    const submitHandler = (e: any) => {
        e.preventDefault()
    }

    const submitEventHandler = (e:any) =>{
        e.preventDefault()
    }

    return (
        <>


            <div className="post_create_btns">
                <div>
                    <div>
                        <h5>Add Local News</h5>
                        <button onClick={showModal}><i className="fa-solid fa-plus"></i> Create Post</button>

                    </div>
                </div>
                <div>
                    <div>
                        <h5>Add Events</h5>
                        <button onClick={showEventModal}><i className="fa-solid fa-plus"></i> Create Events</button>
                    </div>
                </div>
            </div>

            <Modal
                id="createPost"
                title="Create News Post"
                isHidden={modalHidden}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={showModal}
            >

                <Alerts3
                    alert={alertClass}
                    msg={`${msg}`}
                    isHidden={alert}
                    onClick={closeAlert}
                ></Alerts3>

                <div className="sign_up_form">
                    <form onSubmit={submitHandler}>

                        <p className='text-color2'>Date: 30 sept, 2023</p>

                        <div className="sign_up_one_col">
                            <div><input type={'text'} name={'newsTitle'} placeholder={'News Title'}
                                onChange={(e) => setNewsTitle(e.target.value)}
                                value={newsTitle}
                                required /></div>
                        </div>

                        <div className="sign_up_one_col" >
                            <div style={{height:`100px`}}><textarea name={'newsDescription'} placeholder={'News Description'}
                                onChange={(e) => setNewsDes(e.target.value)}
                                value={newsDes}
                                required ></textarea></div>
                        </div>

                        <input type="file" name="img_file" id="img_file" style={{display:`none`}} />

                        <div className="img_upload_bar">

                            <div className='btn_upload' >
                                <label htmlFor="img_file">
                                    <div >
                                        <div></div>
                                        
                                            <div className='btn_plus' >
                                                <div><i className="fa-solid fa-plus"></i></div>
                                            </div>
                                        
                                    </div>
                                </label>
                            </div>

                            <div className='btn_img' >
                                <div >
                                    <div style={{ backgroundImage: `url(https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg)` }}></div>
                                    <div className='btn_minus'>
                                        <div><i className="fa-solid fa-minus"></i></div>
                                    </div>
                                </div>
                            </div>

                            <div className='btn_img' >
                                <div >
                                    <div style={{ backgroundImage: `url(https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg)` }}></div>
                                    <div className='btn_minus'>
                                        <div><i className="fa-solid fa-minus"></i></div>
                                    </div>
                                </div>
                            </div>

                            <div className='btn_img' >
                                <div >
                                    <div style={{ backgroundImage: `url(https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg)` }}></div>
                                    <div className='btn_minus'>
                                        <div><i className="fa-solid fa-minus"></i></div>
                                    </div>
                                </div>
                            </div>

                            <div className='btn_img' >
                                <div >
                                    <div style={{ backgroundImage: `url(https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg)` }}></div>
                                    <div className='btn_minus'>
                                        <div><i className="fa-solid fa-minus"></i></div>
                                    </div>
                                </div>
                            </div>
                            

                        </div>

                        <p className='text-color2'>Pin: 783360</p>

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

            <Modal
                id="createEvents"
                title="Create Events Post"
                isHidden={modalEventHidden}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={showEventModal}
            >

                <Alerts3
                    alert={alertClass}
                    msg={`${msg}`}
                    isHidden={alert}
                    onClick={closeAlert}
                ></Alerts3>

                <div className="sign_up_form">
                    <form onSubmit={submitEventHandler}>

                        <p className='text-color2'>Start Date and End Date</p>

                        <div className="sign_up_two_col">
                            <div>
                                <div><input type="date" name="start_date" placeholder="Start Date" required
                                    value=""
                                    onChange={(e) => {}}
                                /></div>
                            </div>
                            <div>
                                <div><input type="date" name="end_date" placeholder="End Date"
                                    value=""
                                    onChange={(e) => {}}
                                    required /></div>
                            </div>
                        </div>

                        <div className="sign_up_one_col">
                            <div><input type={'text'} name={'eventTitle'} placeholder={'Event Title'}
                                onChange={(e) => setEventTitle(e.target.value)}
                                value={eventTitle}
                                required /></div>
                        </div>

                        <div className="sign_up_one_col" >
                            <div style={{ height: `100px` }}><textarea name={'eventDescription'} placeholder={'Event Description'}
                                onChange={(e) => setEventDes(e.target.value)}
                                value={eventDes}
                                required ></textarea></div>
                        </div>

                        <input type="file" name="img_file" id="img_file" style={{ display: `none` }} />

                        <div className="img_upload_bar">

                            <div className='btn_upload' >
                                <label htmlFor="img_file">
                                    <div >
                                        <div></div>

                                        <div className='btn_plus' >
                                            <div><i className="fa-solid fa-plus"></i></div>
                                        </div>

                                    </div>
                                </label>
                            </div>

                            <div className='btn_img' >
                                <div >
                                    <div style={{ backgroundImage: `url(https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg)` }}></div>
                                    <div className='btn_minus'>
                                        <div><i className="fa-solid fa-minus"></i></div>
                                    </div>
                                </div>
                            </div>

                            <div className='btn_img' >
                                <div >
                                    <div style={{ backgroundImage: `url(https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg)` }}></div>
                                    <div className='btn_minus'>
                                        <div><i className="fa-solid fa-minus"></i></div>
                                    </div>
                                </div>
                            </div>

                            <div className='btn_img' >
                                <div >
                                    <div style={{ backgroundImage: `url(https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg)` }}></div>
                                    <div className='btn_minus'>
                                        <div><i className="fa-solid fa-minus"></i></div>
                                    </div>
                                </div>
                            </div>

                            <div className='btn_img' >
                                <div >
                                    <div style={{ backgroundImage: `url(https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg)` }}></div>
                                    <div className='btn_minus'>
                                        <div><i className="fa-solid fa-minus"></i></div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <p className='text-color2'>Pin: 783360</p>

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

export default CreatePost
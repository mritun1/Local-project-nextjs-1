"use client"
import React, { useState } from 'react'
import Modal from '../../temp/Modal'
import ButtonLoading from '../../temp/ButtonLoading'
import ImageInput from '../../temp/ImageInput'

type propsType = {
    loadCont: ()=>void,
}

const CreatePost = (props:propsType) => {
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

    const [modalHidden, setModalHidden] = useState<boolean>(false)
    const [modalEventHidden, setModalEventHidden] = useState<boolean>(false)

    const [submitBtn, setSubmitBtn] = useState<boolean>(true)
    const [newsTitle, setNewsTitle] = useState<string>("")
    const [newsDes, setNewsDes] = useState<string>("")
    const [imgLists, setImgLists] = useState<Array<string>>([])
    const [imgEventLists, setImgEventLists] = useState<Array<string>>([])

    const showModal = async () => {
        setModalHidden(!modalHidden);

        try {
            const res = await checkCreateDraft("/api/posts/news/draft/");

            if (res.ok) {
                const data = await res.json();

                if (data && data.res && data.res.title) {
                    setNewsTitle(data.res.title);
                } else {
                    console.log("No title in the response data.");
                }

                if (data && data.res && data.res.des) {
                    setNewsDes(data.res.des);
                } else {
                    console.log("No description in the response data.");
                }

                if (data && data.res && data.res.images) {
                    setImgLists(data.res.images);
                } else {
                    console.log("No description in the response data.");
                }

            } else {
                console.log("Response not OK.");
            }
        } catch (error) {
            console.error("Error in fetching or parsing the response:", error);
        }
    }

    const postUpdate = async (e: any, f: string) => {
        const val = e.target.value
        if (f === "title") { setNewsTitle(val) }
        if (f === "des") { setNewsDes(val) }
        const res = await fetch("/api/posts/news/update", {
            method: "PATCH",
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

    //FOR EVENTS
    const [eventStartDate, setEventStartDate] = useState<string>("")
    const [eventEndDate, setEventEndDate] = useState<string>("")
    const [eventTitle, setEventTitle] = useState<string>("")
    const [eventDes, setEventDes] = useState<string>("")

    const showEventModal = async () => {
        setModalEventHidden(!modalEventHidden)
        try {
            const res = await checkCreateDraft("/api/posts/events/draft/");

            if (res.ok) {
                const data = await res.json();
                if (data && data.res && data.res.startDate) {
                    const isoDate = data.res.startDate;
                    const formattedDate = new Date(isoDate).toISOString().split('T')[0];
                    setEventStartDate(formattedDate);
                }
                if (data && data.res && data.res.endDate) {
                    const isoDate = data.res.endDate;
                    const formattedDate = new Date(isoDate).toISOString().split('T')[0];
                    setEventEndDate(formattedDate);
                }

                if (data && data.res && data.res.title) {
                    setEventTitle(data.res.title);
                } else {
                    console.log("No title in the response data.");
                }

                if (data && data.res && data.res.des) {
                    setEventDes(data.res.des);
                } else {
                    console.log("No description in the response data.");
                }

                if (data && data.res && data.res.images) {
                    setImgEventLists(data.res.images);
                } 

            } else {
                console.log("Response not OK.");
            }
        } catch (error) {
            console.error("Error in fetching or parsing the response:", error);
        }
    }

    const eventUpdate = async (e: any, f: string) => {
        const val = e.target.value
        if (f === "title") { setEventTitle(val) }
        if (f === "des") { setEventDes(val) }
        if (f === "startDate") { setEventStartDate(val) }
        if (f === "endDate") { setEventEndDate(val) }
        const res = await fetch("/api/posts/events/update", {
            method: "PATCH",
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

    const submitPost = async (name: string, url: string, title: string, des: string, startDate: string, endDate: string) => {
        setSubmitBtn(false)
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                des: des,
                startDate: startDate || "",
                endDate: endDate || "",
            })
        })
        if (res.ok) {
            setSubmitBtn(true)
            const data = await res.json()
            console.log(data)
            if (name === "news") {
                setNewsTitle("")
                setNewsDes("")
                setModalHidden(!modalHidden)
            }
            if (name === "events") {
                setEventTitle("")
                setEventDes("")
                setEventStartDate("")
                setEventEndDate("")
                setModalEventHidden(!modalEventHidden)
            }
            props.loadCont();
        } else {
            console.log("something went wrong")
        }
    }

    const submitHandler = async (e: any) => {
        e.preventDefault()
        await submitPost("news", "/api/posts/news/create/", newsTitle, newsDes, "", "")
    }

    const submitEventHandler = async (e: any) => {
        e.preventDefault()
        await submitPost("events", "/api/posts/events/create/", eventTitle, eventDes, eventStartDate, eventEndDate)
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

                <div className="sign_up_form">
                    <form onSubmit={submitHandler}>

                        <p className='text-color2'>Date: 30 sept, 2023</p>

                        <div className="sign_up_one_col">
                            <div><input type={'text'} name={'newsTitle'} placeholder={'News Title'}
                                onChange={(e) => postUpdate(e, "title")}
                                value={newsTitle}
                                required /></div>
                        </div>

                        <div className="sign_up_one_col" >
                            <div style={{ height: `100px` }}><textarea name={'newsDescription'} placeholder={'News Description'}
                                onChange={(e) => postUpdate(e, "des")}
                                value={newsDes}
                                required ></textarea></div>
                        </div>


                        <ImageInput
                            key={"c3"}
                            service='news'
                            imgLists={imgLists}
                            serviceFor='draft'
                            postId={''}
                        ></ImageInput>


                        <p className='text-color2'>Pin: 783360</p>

                        <ButtonLoading
                            submitLoad={submitBtn}
                        >
                            <div className="btn-box right">
                                <div>
                                    <button type='submit' className='save'><i className="fa-solid fa-plus"></i> Create</button>
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

                <div className="sign_up_form">
                    <form onSubmit={submitEventHandler}>

                        <p className='text-color2'>Start Date and End Date</p>

                        <div className="sign_up_two_col">
                            <div>
                                <div><input type="date" name="start_date" placeholder="Start Date" required
                                    value={eventStartDate}
                                    onChange={(e) => eventUpdate(e, "startDate")}
                                /></div>
                            </div>
                            <div>
                                <div><input type="date" name="end_date" placeholder="End Date"
                                    value={eventEndDate}
                                    onChange={(e) => eventUpdate(e, "endDate")}
                                    required /></div>
                            </div>
                        </div>

                        <div className="sign_up_one_col">
                            <div><input type={'text'} name={'eventTitle'} placeholder={'Event Title'}
                                onChange={(e) => eventUpdate(e, "title")}
                                value={eventTitle}
                                required /></div>
                        </div>

                        <div className="sign_up_one_col" >
                            <div style={{ height: `100px` }}><textarea name={'eventDescription'} placeholder={'Event Description'}
                                onChange={(e) => eventUpdate(e, "des")}
                                value={eventDes}
                                required ></textarea></div>
                        </div>

                        {/* <input type="file" name="img_file" id="img_file" style={{ display: `none` }} /> */}

                        <ImageInput
                            key={"c4"}
                            service='events'
                            imgLists={imgEventLists}
                            serviceFor='draft'
                            postId={''}
                        ></ImageInput>

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
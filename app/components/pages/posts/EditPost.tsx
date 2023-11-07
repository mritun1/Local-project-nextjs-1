import React, { useState } from 'react'
import Modal from '../../temp/Modal'
import ImageInput from '../../temp/ImageInput';
import ButtonLoading from '../../temp/ButtonLoading';
import customDate from '@/app/lib/customDate';

type propsType = {
    postType: String,
    postId: String,
    loadCont: ()=>void,
}

const EditPost = (props: propsType) => {
    const [editNews, setEditNews] = useState<boolean>(false);
    const [editEvents, setEditEvents] = useState<boolean>(false);
    const [imgLists, setImgLists] = useState<Array<string>>([]);
    const [imgEventLists, setImgEventLists] = useState<Array<string>>([]);

    const newsModal = () => {
        setEditNews(!editNews);
    }
    const eventsModal = () => {
        setEditEvents(!editEvents);
    }

    const getPostById = async (url: string) => {
        const res = await fetch(url);
        return res;
    }

    const [eventTitle, setEventTitle] = useState<string>('');
    const [eventDes, setEventDes] = useState<string>("");
    const [eventStartDate, setEventStartDate] = useState<string>("");
    const [eventEndDate, setEventEndDate] = useState<string>("");
    const [eventId,setEventId] = useState<string>("")
    const [eventLoad,setEventLoad] = useState<boolean>(true);

    const [newsTitle, setNewsTitle] = useState<string>('');
    const [newsDes, setNewsDes] = useState<string>("");
    const [newsId, setNewsId] = useState<string>("");
    const [newsLoad,setNewsLoad] = useState<boolean>(true);

    const editModalClick = async (e: String) => {
        if (e === 'News') {
            setEditNews(!editNews);
            const res = await getPostById("/api/posts/news/" + props.postId);
            if (res.ok) {
                const data = await res.json();
                setNewsTitle(data.data[0].title)
                setNewsDes(data.data[0].des)
                setImgLists(data.data[0].images)
                setNewsId(data.data[0]._id)
            } else {
                console.log("Error while fetching");
            }
        }
        if (e === 'Event') {
            setEditEvents(!editEvents);
            const res = await getPostById("/api/posts/events/" + props.postId);
            if (res.ok) {
                const data = await res.json();
                setEventTitle(data.data[0].title)
                setEventDes(data.data[0].des)
                setEventId(data.data[0]._id)
                
                const date_obj = new customDate();

                const start_date = data.data[0].startDate;
                const newStartDate = date_obj.isoToInput(start_date);

                const end_date = data.data[0].endDate;
                const newEndDate = date_obj.isoToInput(end_date);

                setEventStartDate(newStartDate)
                setEventEndDate(newEndDate)
                setImgEventLists(data.data[0].images)
            } else {
                console.log("Error while fetching");
            }
        }
    }

    const updateEvent = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEventLoad(!eventLoad)
        const res = await fetch("/api/posts/events/create/",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id: eventId,
                title:eventTitle,
                des: eventDes,
                startDate: eventStartDate,
                endDate: eventEndDate
            })
        })
        if(res.ok){
            const data = await res.json();
            console.log(data);
            setEventLoad(true);
            setEditEvents(!editEvents);
            props.loadCont();
        }else{
            console.log("Error, while getting updating");
        }
    }

    const updateNews = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setNewsLoad(!newsLoad)
        const res = await fetch("/api/posts/news/create/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: newsId,
                title: newsTitle,
                des: newsDes,
            })
        })
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            setNewsLoad(true);
            setEditNews(!editNews);
            props.loadCont();
        } else {
            console.log("Error, while getting updating");
        }
    }

    return (
        <>
            <button onClick={() => editModalClick(props.postType)} className="edit"><i className="fa-solid fa-pen-to-square"></i> Edit</button>
            <button className="del"><i className="fa-solid fa-trash"></i> Delete</button>
            <button className="view"><i className="fa-solid fa-eye"></i> preview</button>

            <Modal
                id="editNews"
                title="Edit News"
                isHidden={editNews}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={newsModal}
            >

                <div className="sign_up_form">
                    <form onSubmit={updateNews} >

                        <p className='text-color2'>Date: 30 sept, 2023</p>

                        <div className="sign_up_one_col">
                            <div><input type={'text'} name={'newsTitle'} placeholder={'News Title'}
                                onChange={(e) => setNewsTitle(e.target.value)}
                                value={newsTitle}
                                required /></div>
                        </div>

                        <div className="sign_up_one_col" >
                            <div style={{ height: `100px` }}><textarea name={'newsDescription'} placeholder={'News Description'}
                                onChange={(e) => setNewsDes(e.target.value)}
                                value={newsDes}
                                required ></textarea></div>
                        </div>


                        <ImageInput
                            service='news'
                            imgLists={imgLists}
                        ></ImageInput>


                        <p className='text-color2'>Pin: 783360</p>

                        <ButtonLoading
                            submitLoad={newsLoad}
                        >
                            <div className="btn-box right">
                                <div>
                                    <button type='submit' className='save'><i className="fa-solid fa-floppy-disk"></i> Update</button>
                                </div>
                            </div>
                        </ButtonLoading>

                    </form>
                </div>
            </Modal>

            <Modal
                id="editEvents"
                title="Edit Events"
                isHidden={editEvents}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={eventsModal}
            >

                <div className="sign_up_form">
                    <form onSubmit={updateEvent} >

                        <p className='text-color2'>Start Date and End Date</p>

                        <div className="sign_up_two_col">
                            <div>
                                <div><input
                                    type="date"
                                    name="start_date"
                                    placeholder="Start Date"
                                    required
                                    onChange={(e) => setEventStartDate(e.target.value)}
                                    value={eventStartDate}
                                />
                                </div>
                            </div>
                            <div>
                                <div><input
                                    type="date"
                                    name="end_date"
                                    placeholder="End Date"
                                    onChange={(e) => setEventEndDate(e.target.value)}
                                    value={eventEndDate}
                                    required /></div>
                            </div>
                        </div>

                        <div className="sign_up_one_col">
                            <div>
                                <input
                                type={'text'}
                                name={'eventTitle'}
                                placeholder={'Event Title'}
                                onChange={(e) => setEventTitle(e.target.value)}
                                value={eventTitle}
                                required /></div>
                        </div>

                        <div className="sign_up_one_col" >
                            <div style={{ height: `100px` }}>
                                <textarea
                                name={'eventDescription'}
                                placeholder={'Event Description'}
                                onChange={(e) => setEventDes(e.target.value)}
                                value={eventDes}
                                required ></textarea></div>
                        </div>

                        <input
                            type="file"
                            name="img_file"
                            id="img_file"
                            style={{ display: `none` }}
                        />

                        <ImageInput
                            service='events'
                            imgLists={imgEventLists}
                        ></ImageInput>

                        <p className='text-color2'>Pin: 783360</p>

                        <ButtonLoading
                            submitLoad={eventLoad}
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

export default EditPost
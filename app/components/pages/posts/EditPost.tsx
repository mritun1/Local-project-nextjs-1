import React, { useState } from 'react'
import Modal from '../../temp/Modal'
import ImageInput from '../../temp/ImageInput';
import ButtonLoading from '../../temp/ButtonLoading';

type propsType = {
    postType:String,
    postId:String
}

const EditPost = (props:propsType) => {
    const [editNews, setEditNews] = useState<boolean>(false);
    const [editEvents, setEditEvents] = useState<boolean>(false);
    const [imgLists, setImgLists] = useState<Array<string>>([]);
    const [imgEventLists, setImgEventLists] = useState<Array<string>>([]);

    const newsModal = () =>{
        setEditNews(!editNews);
    }
    const eventsModal = () => {
        setEditEvents(!editEvents);
    }

    const getPostById = async (url:string) =>{
        const res = await fetch(url);
        if(res.ok){
            const data = await res.json();
            console.log(data);
        }else{
            console.log("Error while fetching");
        }
    }

    const editModalClick = (e:String) =>{
        if(e==='News'){
            setEditNews(!editNews);
        }
        if (e === 'Event') {
            setEditEvents(!editEvents);
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
                    <form >

                        <p className='text-color2'>Date: 30 sept, 2023</p>

                        <div className="sign_up_one_col">
                            <div><input type={'text'} name={'newsTitle'} placeholder={'News Title'}
                                
                                required /></div>
                        </div>

                        <div className="sign_up_one_col" >
                            <div style={{ height: `100px` }}><textarea name={'newsDescription'} placeholder={'News Description'}
                                
                                required ></textarea></div>
                        </div>


                        <ImageInput
                            service='news'
                            imgLists={imgLists}
                        ></ImageInput>


                        <p className='text-color2'>Pin: 783360</p>

                        <ButtonLoading
                            submitLoad={true}
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
                id="editEvents"
                title="Edit Events"
                isHidden={editEvents}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={eventsModal}
            >

                <div className="sign_up_form">
                    <form >

                        <p className='text-color2'>Start Date and End Date</p>

                        <div className="sign_up_two_col">
                            <div>
                                <div><input type="date" name="start_date" placeholder="Start Date" required
                                    
                                /></div>
                            </div>
                            <div>
                                <div><input type="date" name="end_date" placeholder="End Date"
                                    
                                    required /></div>
                            </div>
                        </div>

                        <div className="sign_up_one_col">
                            <div><input type={'text'} name={'eventTitle'} placeholder={'Event Title'}
                                
                                required /></div>
                        </div>

                        <div className="sign_up_one_col" >
                            <div style={{ height: `100px` }}><textarea name={'eventDescription'} placeholder={'Event Description'}
                                
                                required ></textarea></div>
                        </div>

                        <input type="file" name="img_file" id="img_file" style={{ display: `none` }} />

                        <ImageInput
                            service='events'
                            imgLists={imgEventLists}
                        ></ImageInput>

                        <p className='text-color2'>Pin: 783360</p>

                        <ButtonLoading
                            submitLoad={true}
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

export default EditPost
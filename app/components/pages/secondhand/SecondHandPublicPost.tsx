import React, { useState } from 'react'
import SecondHandPublicPostBtn from './SecondHandPublicPostBtn'
import DoublyCircularLinkedList from '@/app/lib/dsa/linkedList/circularLinkedList';
import ImgViewer from '../../temp/ImgViewer';
interface propsType {
    index: number;
    images: Array<string>;
    profilePic: string;
    firstName: string;
    doublyLinkedLists: DoublyCircularLinkedList[];
    productPin: number;
    productName: string;
    productPrice: number;
    productOld: string;
    productDes: string;
    contact1: number;
    contact2: number;
    id:string;
}
const SecondHandPublicPost = (props: propsType) => {
    const [imgViewState, setImgViewState] = useState<boolean>(false);
    const imgView = () => {
        setImgViewState(!imgViewState);
    }

    const [imgState, setImgState] = useState<number | null>(null)
    const [imgUrl, setImgUrl] = useState<string | null>(null)
    const getNextImg = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        setImgState(index);
        setImgUrl(props.doublyLinkedLists[index].getNextData());
    };
    const getPrevImg = (index: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        setImgState(index);
        setImgUrl(props.doublyLinkedLists[index].getPrevData());
    };
    return (
        <>
            <div key={props.index}>

                <div>

                    <ImgViewer
                        imgViewState={imgViewState}
                        imgView={imgView}
                        imgUrl={imgState === props.index ? imgUrl : props.images[0]}
                    />

                    <div className="pin_profile">
                        <div>

                            <div className="store_profile" style={{ background: `none` }}>
                                <div>
                                    <div style={{ backgroundImage: props.profilePic ? `url(` + props.profilePic + `)` : `url(/icons/others/profile.webp)`, border: `2px solid #c3c9c4`, height: `30px`, width: `30px` }} className="img"></div>
                                </div>
                                <div>
                                    <div>
                                        <a href="">
                                            <p style={{ fontSize: `13px` }}>{props.firstName}</p>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div><p>{props.productPin} <i className="fa-solid fa-location-dot"></i></p></div>
                        </div>
                    </div>

                    <div className="product_images" >
                        <div className="news_img_sec" style={{
                            backgroundImage: `url(${imgState === props.index ? imgUrl :
                                props.images[0]
                                })`,
                            height: `140px`
                        }}>
                            <div className="news_img_btn_left">
                                <div onClick={getPrevImg(props.index)}><i className="fa-solid fa-angle-left"></i></div>
                            </div>
                            <div className="news_img_btn_right" style={{ left: `95%` }}>
                                <div onClick={getNextImg(props.index)}><i className="fa-solid fa-angle-right"></i></div>
                            </div>
                            <div className="img_btn_center">
                                <div><button onClick={imgView}>View Image</button></div>
                            </div>
                        </div>
                    </div>

                    <h5 className="text-color">{props.productName}</h5>

                    <div className="secondhand_price">
                        <div>
                            <h5><i className="fa-solid fa-indian-rupee-sign"></i>{props.productPrice}</h5>
                        </div>
                        <div>
                            <h5>{props.productOld}</h5>
                        </div> 
                    </div>

                    <SecondHandPublicPostBtn
                        name={props.productName}
                        des={props.productDes}
                        contact1={props.contact1}
                        contact2={props.contact2}
                        id={props.id}
                    ></SecondHandPublicPostBtn>

                </div>
            </div>
        </>
    )
}

export default SecondHandPublicPost
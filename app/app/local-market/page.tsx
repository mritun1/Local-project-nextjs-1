"use client"
import AppContent from '@/app/components/templates/AppContent'
import seenUpdate from '@/app/customlib/seenUpdate';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {

    const seenUpdater = new seenUpdate();
    const pathname = usePathname();

    useEffect(() => {
        return () => {
            seenUpdater.update(pathname);
        };
    }, []);

    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-tag"></i> Secondhand Cycles (39)</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>78336 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        <div className="columns_two_product">


                            <div>
                                <div>
                                    <div className="pin_profile">
                                        <div>

                                            <div className="store_profile" style={{ background: `none` }}>
                                                <div>
                                                    <div style={{ backgroundImage: `url(https://img.etimg.com/thumb/width-1200,height-900,imgsize-552986,resizemode-75,msid-98507873/small-biz/sme-sector/from-ambani-to-adani-why-billionaires-have-not-been-able-to-break-the-stronghold-of-kirana-stores-in-india.jpg)`, border: `2px solid #c3c9c4`, height: `30px`, width: `30px` }} className="img"></div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <a href="">
                                                            <p style={{ fontSize: `13px` }}>Store Name</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <div><p>783360 <i className="fa-solid fa-location-dot"></i></p></div>
                                        </div>
                                    </div>

                                    <div className="product_images" >
                                        <div className="news_img_sec" style={{ backgroundImage: `url(https://i.brecorder.com/wp-content/uploads/2019/10/Electronic-Motorcycles.jpg)`, height: `140px` }}>
                                            <div className="news_img_btn_left">
                                                <div><i className="fa-solid fa-angle-left"></i></div>
                                            </div>
                                            <div className="news_img_btn_right" style={{ left: `95%` }}>
                                                <div><i className="fa-solid fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="text-color">SecondHand Bicycle, everything is fine</h5>

                                    <div className="secondhand_price">
                                        <div>
                                            <h5><i className="fa-solid fa-indian-rupee-sign"></i>5000</h5>
                                        </div>
                                        <div>
                                            <h5>2yrs old</h5>
                                        </div>
                                    </div>

                                    <div className="secondhand_btns">
                                        <div>
                                            <button><i className="fa-solid fa-ellipsis"></i></button>
                                            <p>More</p>
                                        </div>
                                        <div>
                                            <button><i className="fa-solid fa-phone-volume"></i></button>
                                            <p>Contact</p>
                                        </div>
                                        <div>
                                            <button><i className="fa-solid fa-message"></i></button>
                                            <p>Message</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <div>
                                    <div className="pin_profile">
                                        <div>

                                            <div className="store_profile" style={{ background: `none` }}>
                                                <div>
                                                    <div style={{ backgroundImage: `url(https://img.etimg.com/thumb/width-1200,height-900,imgsize-552986,resizemode-75,msid-98507873/small-biz/sme-sector/from-ambani-to-adani-why-billionaires-have-not-been-able-to-break-the-stronghold-of-kirana-stores-in-india.jpg)`, border: `2px solid #c3c9c4`, height: `30px`, width: `30px` }} className="img"></div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <a href="">
                                                            <p style={{ fontSize: `13px` }}>Store Name</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <div><p>783360 <i className="fa-solid fa-location-dot"></i></p></div>
                                        </div>
                                    </div>

                                    <div className="product_images" >
                                        <div className="news_img_sec" style={{ backgroundImage: `url(https://i.brecorder.com/wp-content/uploads/2019/10/Electronic-Motorcycles.jpg)`, height: `140px` }}>
                                            <div className="news_img_btn_left">
                                                <div><i className="fa-solid fa-angle-left"></i></div>
                                            </div>
                                            <div className="news_img_btn_right" style={{ left: `95%` }}>
                                                <div><i className="fa-solid fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="text-color">SecondHand Bicycle, everything is fine</h5>

                                    <div className="secondhand_price">
                                        <div>
                                            <h5><i className="fa-solid fa-indian-rupee-sign"></i>5000</h5>
                                        </div>
                                        <div>
                                            <h5>2yrs old</h5>
                                        </div>
                                    </div>

                                    <div className="secondhand_btns">
                                        <div>
                                            <button><i className="fa-solid fa-ellipsis"></i></button>
                                            <p>More</p>
                                        </div>
                                        <div>
                                            <button><i className="fa-solid fa-phone-volume"></i></button>
                                            <p>Contact</p>
                                        </div>
                                        <div>
                                            <button><i className="fa-solid fa-message"></i></button>
                                            <p>Message</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <div>
                                    <div className="pin_profile">
                                        <div>

                                            <div className="store_profile" style={{ background: `none` }}>
                                                <div>
                                                    <div style={{ backgroundImage: `url(https://img.etimg.com/thumb/width-1200,height-900,imgsize-552986,resizemode-75,msid-98507873/small-biz/sme-sector/from-ambani-to-adani-why-billionaires-have-not-been-able-to-break-the-stronghold-of-kirana-stores-in-india.jpg)`, border: `2px solid #c3c9c4`, height: `30px`, width: `30px` }} className="img"></div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <a href="">
                                                            <p style={{ fontSize: `13px` }}>Store Name</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <div><p>783360 <i className="fa-solid fa-location-dot"></i></p></div>
                                        </div>
                                    </div>

                                    <div className="product_images" >
                                        <div className="news_img_sec" style={{ backgroundImage: `url(https://i.brecorder.com/wp-content/uploads/2019/10/Electronic-Motorcycles.jpg)`, height: `140px` }}>
                                            <div className="news_img_btn_left">
                                                <div><i className="fa-solid fa-angle-left"></i></div>
                                            </div>
                                            <div className="news_img_btn_right" style={{ left: `95%` }}>
                                                <div><i className="fa-solid fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="text-color">SecondHand Bicycle, everything is fine</h5>

                                    <div className="secondhand_price">
                                        <div>
                                            <h5><i className="fa-solid fa-indian-rupee-sign"></i>5000</h5>
                                        </div>
                                        <div>
                                            <h5>2yrs old</h5>
                                        </div>
                                    </div>

                                    <div className="secondhand_btns">
                                        <div>
                                            <button><i className="fa-solid fa-ellipsis"></i></button>
                                            <p>More</p>
                                        </div>
                                        <div>
                                            <button><i className="fa-solid fa-phone-volume"></i></button>
                                            <p>Contact</p>
                                        </div>
                                        <div>
                                            <button><i className="fa-solid fa-message"></i></button>
                                            <p>Message</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <div>
                                    <div className="pin_profile">
                                        <div>

                                            <div className="store_profile" style={{ background: `none` }}>
                                                <div>
                                                    <div style={{ backgroundImage: `url(https://img.etimg.com/thumb/width-1200,height-900,imgsize-552986,resizemode-75,msid-98507873/small-biz/sme-sector/from-ambani-to-adani-why-billionaires-have-not-been-able-to-break-the-stronghold-of-kirana-stores-in-india.jpg)`, border: `2px solid #c3c9c4`, height: `30px`, width: `30px` }} className="img"></div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <a href="">
                                                            <p style={{ fontSize: `13px` }}>Store Name</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <div><p>783360 <i className="fa-solid fa-location-dot"></i></p></div>
                                        </div>
                                    </div>

                                    <div className="product_images" >
                                        <div className="news_img_sec" style={{ backgroundImage: `url(https://i.brecorder.com/wp-content/uploads/2019/10/Electronic-Motorcycles.jpg)`, height: `140px` }}>
                                            <div className="news_img_btn_left">
                                                <div><i className="fa-solid fa-angle-left"></i></div>
                                            </div>
                                            <div className="news_img_btn_right" style={{ left: `95%` }}>
                                                <div><i className="fa-solid fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="text-color">SecondHand Bicycle, everything is fine</h5>

                                    <div className="secondhand_price">
                                        <div>
                                            <h5><i className="fa-solid fa-indian-rupee-sign"></i>5000</h5>
                                        </div>
                                        <div>
                                            <h5>2yrs old</h5>
                                        </div>
                                    </div>

                                    <div className="secondhand_btns">
                                        <div>
                                            <button><i className="fa-solid fa-ellipsis"></i></button>
                                            <p>More</p>
                                        </div>
                                        <div>
                                            <button><i className="fa-solid fa-phone-volume"></i></button>
                                            <p>Contact</p>
                                        </div>
                                        <div>
                                            <button><i className="fa-solid fa-message"></i></button>
                                            <p>Message</p>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>


                    </div>
                }
                rightBar={
                    <div className="cat_right">

                        <div className="cat_title">
                            <div>
                                <a href="/local-market">
                                    <div><div><i className="fa-solid fa-left-long"></i></div></div>
                                </a>
                            </div>
                            <div>
                                <div><h5>Other Categories</h5></div>
                            </div>
                        </div>

                        <div className="cat_list">

                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Bycycle <button>23</button></h5>
                                </a>
                            </div>

                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Cars <button>23</button></h5>
                                </a>
                            </div>
                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Mobile phone <button>23</button></h5>
                                </a>
                            </div>
                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Laptops <button>23</button></h5>
                                </a>
                            </div>
                            <div className="cat">
                                <a href="/local-market-cat">
                                    <h5>Banglow <button>23</button></h5>
                                </a>
                            </div>

                        </div>

                    </div>
                }
            ></AppContent>


        </>
    )
}

export default Page
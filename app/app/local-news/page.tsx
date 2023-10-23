import MoreBtn from '@/app/components/buttons/MoreBtn'
import AppContent from '@/app/components/templates/AppContent'
import React from 'react'

const page = () => {
  return (
    <>
          <AppContent
          mainContent={
                  <div className="main_content" >

                      <div className="title_bar">
                          <div>
                              <div>
                                  <h3><i className="fa-solid fa-clipboard-list icon-list"></i> Local News (23)</h3>
                              </div>
                          </div>
                          <div>
                              <div>
                                  <h4>78336 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                              </div>
                          </div>
                      </div>


                      <div className="offer_post" style={{ height: `580px` }}>

                          <div className="product">

                              <div className="product_news">
                                  <div className="news_date" >
                                      <div>
                                          <h3 ><span className="date">Date:</span> 23 Sept 2023</h3>
                                      </div>

                                      <div className="more_btn" >
                                          
                                          <MoreBtn>
                                              <li><i className="fa-solid fa-floppy-disk"></i> Save</li>
                                              <li><i className="fa-regular fa-flag"></i> Report</li>
                                              <li><i className="fa-solid fa-rectangle-ad"></i> Promote</li>
                                              <li><i className="fa-solid fa-share"></i> Share</li>
                                          </MoreBtn>
                                      </div>

                                  </div>
                                  <div className="product_images">
                                      <div className="news_img_sec" style={{ backgroundImage: `url(https://www.tatamotors.com/wp-content/uploads/2019/11/12040351/press-11nov19-lowres.jpg)` }}>
                                          <div className="news_img_btn_left">
                                              <div><i className="fa-solid fa-angle-left"></i></div>
                                          </div>
                                          <div className="news_img_btn_right">
                                              <div><i className="fa-solid fa-angle-right"></i></div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="product_title">
                                      <h2>New TATA Car Release: Enjoy the best</h2>
                                  </div>
                                  <div className="news_des">
                                      <div>
                                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa autem ratione rerum dolore ad deserunt mollitia quasi itaque, ea sed, ipsum blanditiis distinctio pariatur labore quis! Officia repellendus eos quibusdam...</p>
                                      </div>
                                      <div>
                                          <button>read more...</button>
                                      </div>
                                  </div>
                              </div>

                          </div>

                          <div className="store">
                              <div className="store_profile">
                                  <div>
                                      <div style={{ backgroundImage: `url(https://img.etimg.com/thumb/width-1200,height-900,imgsize-552986,resizemode-75,msid-98507873/small-biz/sme-sector/from-ambani-to-adani-why-billionaires-have-not-been-able-to-break-the-stronghold-of-kirana-stores-in-india.jpg)` }} className="img"></div>
                                  </div>
                                  <div>
                                      <div>
                                          <a href="">
                                              <h5>Store Name</h5>
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </div>


                      <div className="offer_post" style={{ height: `580px` }}>

                          <div className="product">

                              <div className="product_news">
                                  <div className="news_date">
                                      <div>
                                          <h3 ><span className="date">Date:</span> 23 Sept 2023</h3>
                                      </div>

                                      <div className="more_btn" >
                                          <MoreBtn>
                                              <li><i className="fa-solid fa-floppy-disk"></i> Save</li>
                                              <li><i className="fa-regular fa-flag"></i> Report</li>
                                              <li><i className="fa-solid fa-rectangle-ad"></i> Promote</li>
                                              <li><i className="fa-solid fa-share"></i> Share</li>
                                          </MoreBtn>
                                      </div>
                                  </div>
                                  <div className="product_images">
                                      <div className="news_img_sec" style={{ backgroundImage: `url(https://www.tatamotors.com/wp-content/uploads/2019/11/12040351/press-11nov19-lowres.jpg)` }}>
                                          <div className="news_img_btn_left">
                                              <div><i className="fa-solid fa-angle-left"></i></div>
                                          </div>
                                          <div className="news_img_btn_right">
                                              <div><i className="fa-solid fa-angle-right"></i></div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="product_title">
                                      <h2>New TATA Car Release: Enjoy the best</h2>
                                  </div>
                                  <div className="news_des">
                                      <div>
                                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa autem ratione rerum dolore ad deserunt mollitia quasi itaque, ea sed, ipsum blanditiis distinctio pariatur labore quis! Officia repellendus eos quibusdam...</p>
                                      </div>
                                      <div>
                                          <button>read more...</button>
                                      </div>
                                  </div>
                              </div>

                          </div>

                          <div className="store">
                              <div className="store_profile">
                                  <div>
                                      <div style={{ backgroundImage: `url(https://img.etimg.com/thumb/width-1200,height-900,imgsize-552986,resizemode-75,msid-98507873/small-biz/sme-sector/from-ambani-to-adani-why-billionaires-have-not-been-able-to-break-the-stronghold-of-kirana-stores-in-india.jpg)` }} className="img"></div>
                                  </div>
                                  <div>
                                      <div>
                                          <a href="">
                                              <h5>Store Name</h5>
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </div>


                  </div>
          }
          rightBar={
            ``
          }
          />
    </>
  )
}

export default page
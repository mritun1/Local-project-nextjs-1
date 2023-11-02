import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import axios from 'axios'

const ImageInput = () => {
    //UPLOAD IMAGE - NEWS
    const [imgUploadState, setImgUploadState] = useState<boolean>(true)
    const [imgUploadNum, setImgUploadNum] = useState<number>(0)
    const [imgLists,setImgLists] = useState<Array<string>>([])
    let source = axios.CancelToken.source();
    const newsImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        source.cancel(); // Cancel the previous request, if any
        source = axios.CancelToken.source();
        const fileObj = e.target.files?.[0]
        if (fileObj) {
            setImgUploadState(!imgUploadState)
            const formData = new FormData();
            formData.set("imgFile", fileObj)


            axios.post("/api/image/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (event) => {
                    if (event.total !== undefined) {
                        const progress = (event.loaded / event.total) * 100;
                        setImgUploadNum(Math.round(progress));
                    }
                },
                cancelToken: source.token,
            })
                .then((response) => {
                    //console.log('Response data:', response.data);
                    setImgUploadState(true)

                    setImgLists([...imgLists,response.data.image])
                    console.log(imgLists)

                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }
    }
  return (
    <>
          <ProgressBar
              width={imgUploadNum.toString()}
              display={imgUploadState}
          ></ProgressBar>

          <input type="file" onChange={(e) => newsImgUpload(e)} name="img_file" id="img_file" style={{ display: `none` }} />

          <div id='imgGal' className="img_upload_bar">

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

              {imgLists ? (
                  imgLists.map((image, index) => (
                      <div key={index} className="btn_img">
                          <div>
                              <div style={{ backgroundImage: `url(${image})` }}></div>
                              <div className="btn_minus">
                                  <div>
                                      <i className="fa-solid fa-minus"></i>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
              ) : ""}


              {/* <div className='btn_img' >
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
              </div> */}


          </div>
    </>
  )
}

export default ImageInput
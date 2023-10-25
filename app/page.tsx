import SignUpModal from './components/buttons/SignUpModal'
import ActivateForm from './components/form/ActivateForm'
import Login from './components/form/Login'
import Image from 'next/image'

export default function Home() {

  return (
    <main>

      <div className="home_page">
        <div className="home_cont container">

          <div>

            <div style={{ background: `url(https://wallpaperaccess.com/full/397969.jpg)` }}>

              <div>
                <h1>Localnii</h1>
                <p>Social network for business only. Create an account and connect with customers and other business people. Post an offer, product release news, sell second-hand products, post an event, etc. You can search your local people by profession.</p>
              </div>

            </div>
            <div>

              <div>

                <Login></Login>

                <div className="hr_or">
                  <hr />
                  <button>OR</button>
                </div>

                <div className="btn-reg">
                  <div>
                    <SignUpModal />
                  </div>
                </div>

                <div className="apps">
                  <div>
                    <div >
                      <div style={{ backgroundImage: `url(https://www.computerhope.com/jargon/a/android.png)` }}></div>
                      <div><h3>Android</h3></div>
                    </div>
                  </div>
                  <div>
                    <div >
                      <div style={{ backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/020/489/291/original/3d-logo-of-apple-iphone-free-png.png)` }}></div>
                      <div><h3>iPhone</h3></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div>
            <p>English(US)</p>
            <p>
              <a href="">About us</a>
              <a href="">Terms & Conditions</a>
              <a href="">Contact us</a>
              <a href="">Feedback</a>
            </p>
            <p><i>Developed by</i> <b>Mritunjoy Tech OPC Pvt Ltd</b></p>
          </div>

        </div>
      </div>







      {/* <ActivateForm
        id="65381f855d50b9aa3ebaed71"
      /> */}






    </main>
  )
}

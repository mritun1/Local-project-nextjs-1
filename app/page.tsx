import SignUpModal from './components/buttons/SignUpModal'
import Login from './components/form/Login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Localnii - PIN code wise community.',
  description: 'To stay connected locally. Local Social network for business only. Hyper local content sharing platform. PIN code wise community.',
  icons:'/icons/logo/logo1.png'
}

export default function Home() {

  return (
    <div>
      <main>
        <div className="home_page">
          <div className="home_cont container">

            <div>

              <div style={{ background: `url(/icons/others/home.webp)` }}>

                <div>
                  <h1>Localnii</h1>
                  <p>To stay connected locally. Local Social media for business only. Hyper local content sharing platform. PIN code wise community.</p>
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



      </main>
    </div>
  )
}

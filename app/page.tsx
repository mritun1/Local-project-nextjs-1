import SignUpModal from './components/buttons/SignUpModal'
import Login from './components/form/Login'
import { Metadata } from 'next'
import AppInstallBtns from './components/pages/home/AppInstallBtns'

export const metadata: Metadata = {
  title: 'Localnii - Find local people, news, events, products, and many more.',
  description: 'Find local people to chat with and contribute. Get daily updates on local news and events to stay locally aware. Find local products and businesses nearby. Stay connected with local businesses.',
  icons: '/icons/logo/logo1.png'
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
                  <p>To stay connected with local businesses. Local Social media for business only. Hyper local content sharing platform. PIN code wise community.</p>
                </div>

              </div>
              <div>

                <div>

                  <div className="mob_logo_div" >
                    <div><div></div></div>
                  </div>

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

                  <div className="hr_or app_install_hr">
                    <hr />
                    <button>Install App</button>
                  </div>

                  <AppInstallBtns></AppInstallBtns>

                </div>

              </div>

            </div>

            <div>
              <p>English(US)</p>
              <p>
                <a href="/blogs/others/about-us">About us</a>
                <a href="/blogs/others/terms-condition">Terms & Conditions</a>
                <a href="/blogs/others/return-policy">Return Policy</a>
              </p>
              <p><i>Developed by</i> <b>Mritunjoy Tech OPC Pvt Ltd</b></p>
            </div>

          </div>
        </div>



      </main>
    </div>
  )
}

import SingleText from '@/app/components/form/singleData/SingleText'
import AppContent from '@/app/components/templates/AppContent'
import React from 'react'

const page = () => {
  return (
      <>

          <AppContent
              mainContent={
                  <div className="main_content">

                      <div className="title_bar">
                          <div>
                              <div>
                                  <h3><i className="fa-solid fa-id-badge icon-list"></i> Profile</h3>
                              </div>
                          </div>
                          <div>
                              <div>
                                  <h4>78336 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                              </div>
                          </div>
                      </div>

                      <SingleText title='Name'>Mritunjoy Mushahary</SingleText>
                      <SingleText title='Mobile Number'>8011501382</SingleText>
                      <SingleText title='Pin Code'>783360</SingleText>




                  </div>
              }
              rightBar={``}
          ></AppContent>

      </>
  )
}

export default page
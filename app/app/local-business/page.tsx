"use client"
import AppContent from '@/app/components/templates/AppContent'
import seenUpdate from '@/app/customlib/seenUpdate';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const LocalBusiness = () => {

    // const seenUpdater = new seenUpdate();
    // const pathname = usePathname();

    // useEffect(() => {
    //     return () => {
    //         seenUpdater.update(pathname);
    //     };
    // }, []);

  return (
    <>
          

        <AppContent 
            mainContent={
                  <div className="main_content" >

                      <div className="title_bar">
                          <div>
                              <div>
                                  <h3><i className="fa-solid fa-briefcase icon-list"></i> Local Business (23)</h3>
                              </div>
                          </div>
                          <div>
                              <div>
                                  <h4>78336 <button><i className="fa-solid fa-location-dot"></i></button></h4>
                              </div>
                          </div>
                      </div>

                      <div className="categories_lists">
                          <div>
                              <Link href="/app/local-business-cat">
                                  <div>
                                      <h3>Carpenter</h3>
                                      <button>2</button>
                                  </div>
                              </Link>
                          </div>
                          <div>
                              <Link href="/app/local-business-cat">
                                  <div>
                                      <h3>Electricians</h3>
                                      <button>2</button>
                                  </div>
                              </Link>
                          </div>
                          <div>
                              <Link href="/app/local-business-cat">
                                  <div>
                                      <h3>Restaurents</h3>
                                      <button>2</button>
                                  </div>
                              </Link>
                          </div>
                          <div>
                              <Link href="/app/local-business-cat">
                                  <div>
                                      <h3>Fashon Store</h3>
                                      <button>34</button>
                                  </div>
                              </Link>
                          </div>
                          <div>
                              <Link href="/app/local-business-cat">
                                  <div>
                                      <h3>Bike Machanics</h3>
                                      <button>23</button>
                                  </div>
                              </Link>
                          </div>
                      </div>

                  </div> 
            }
            rightBar={``}
        ></AppContent>

          
    </>
  )
}

export default LocalBusiness
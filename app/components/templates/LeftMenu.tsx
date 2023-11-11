"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const LeftMenu = () => {
      const pathname = usePathname();

      const [pin,setPin] = useState<number>(0)

      useEffect(()=>{
            const fetchData = async()=>{
                  const res = await fetch("/api/onload/leftmenu/",{
                        method:'GET',
                        headers: {
                              'Cache-Control': 'no-cache, no-store',
                        },
                  });
                  if (res.ok) {
                        const data = await res.json();
                        console.log("LeftMenu.tsx - loaded")
                        if (data.code === 1) {
                              setPin(data.pin)
                        } else {
                              console.log("Your are not logged in")
                        }
                  } else {
                        console.log("Error: fetching layout")
                  }
            }
            return () => {
                  fetchData();
                  
            }
      },[])

      return (
            <>
                  <div className="left_pin">
                        <button><i className="fa-solid fa-street-view"></i> {pin}</button>
                  </div>

                  <div className="left_menu" style={{ borderBottom: `none` }}>
                        <ul className="vertical_list">
                              <Link href="/app/local-news" className="link_color">
                                    <li
                                          className={pathname === '/app/local-news' ? 'active' : ''}
                                    ><i className="fa-solid fa-clipboard-list icon-list"></i> Local News <span className="level">0</span></li>
                              </Link>
                              <Link href="/app/local-events" className="link_color">
                                    <li className={pathname === '/app/local-events' ? 'active' : ''}><i className="fa-regular fa-calendar icon-list"></i> Local Events <span className="level">0</span></li>
                              </Link>
                              <Link href="/app/local-offers" className="link_color">
                                    <li
                                          className={pathname === '/app/local-offers' ? 'active' : ''}
                                    ><i className="fa-solid fa-bolt icon-list"></i> Local offers <span className="level">0</span></li>
                              </Link>
                              <Link href="/app/local-market" className="link_color">
                                    <li className={pathname === '/app/local-market' ? 'active' : ''}><i className="fa-solid fa-bag-shopping icon-list"></i> Local Market <span className="level">0</span></li>
                              </Link>
                              <Link href="/app/local-secondhand" className="link_color">
                                    <li className={pathname === '/app/local-secondhand' ? 'active' : ''}><i className="fa-solid fa-bag-shopping icon-list"></i> Local Secondhand <span className="level">0</span></li>
                              </Link>
                              <Link href="/app/local-business" className="link_color">
                                    <li className={pathname === '/app/local-business' || pathname === '/app/local-business-cat' ? 'active' : ''}><i className="fa-solid fa-briefcase icon-list"></i> Local Business <span className="level">0</span></li>
                              </Link>
                              <Link href="/app/local-groups" className="link_color">
                                    <li className={pathname === '/app/local-groups' ? 'active' : ''}><i className="fa-solid fa-users-rectangle icon-list"></i> Local Groups <span className="level">0</span></li>
                              </Link>
                              <Link href="/app/local-people" className="link_color">
                                    <li className={pathname === '/app/local-people' || pathname === '/app/local-people-cat' ? 'active' : ''}><i className="fa-solid fa-users icon-list"></i> Local People <span className="level">0</span></li>
                              </Link>
                        </ul>
                  </div>

                  <div className="left_menu">
                        <ul className="vertical_list">
                              <Link href="/app/my-posts" className="link_color">
                                    <li className={pathname === '/app/my-posts' ? 'active' : ''}><i className="fa-solid fa-newspaper icon-list"></i> My Posts <span className="level" style={{ color: `#9ea79f` }}><i className="fa-solid fa-plus"></i></span></li>
                              </Link>
                              <Link href="/app/my-market" className="link_color">
                                    <li className={pathname === '/app/my-market' ? 'active' : ''}><i className="fa-solid fa-boxes-stacked icon-list"></i> My Market <span className="level" style={{ color: `#9ea79f` }}><i className="fa-solid fa-plus"></i></span></li>
                              </Link>
                              <Link href="/app/my-stores" className="link_color">
                                    <li className={pathname === '/app/my-stores' ? 'active' : ''}><i className="fa-solid fa-store icon-list"></i> My Stores <span className="level" style={{ color: `#9ea79f` }}><i className="fa-solid fa-plus"></i></span></li>
                              </Link>
                              <Link href="/app/my-referral" className="link_color">
                                    <li className={pathname === '/app/my-referral' ? 'active' : ''}><i className="fa-solid fa-users-rays icon-list"></i> My Referral <span className="level" style={{ color: `#9ea79f` }}><i className="fa-solid fa-plus"></i></span></li>
                              </Link>
                              <Link href="/app/delivery-boy" className="link_color">
                                    <li className={pathname === '/app/delivery-boy' ? 'active' : ''}><i className="fa-solid fa-truck icon-list"></i> Delivery Boy</li>
                              </Link>
                              <Link href="/app/my-earnings" className="link_color">
                                    <li className={pathname === '/app/my-earnings' ? 'active' : ''}><i className="fa-solid fa-sack-dollar icon-list"></i> My Earnings <span className="level"><i className="fa-solid fa-indian-rupee-sign"></i>200</span></li>
                              </Link>
                              <Link href="/app/my-advertisement" className="link_color">
                                    <li className={pathname === '/app/my-advertisement' ? 'active' : ''}><i className="fa-solid fa-bullhorn icon-list"></i> My Advertisement</li>
                              </Link>

                        </ul>
                  </div>


            </>
      )
}

export default LeftMenu
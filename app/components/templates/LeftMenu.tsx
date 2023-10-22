"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LeftMenu = () => {
    const pathname  = usePathname();
    return (
    <>
          <div className="left_menu" style={{ borderBottom: `none` }}>
              <ul className="vertical_list">
                  <Link href="/app/local-offers" className="link_color">
                      <li
                            className={pathname === '/app/local-offers' ? 'active' : ''}
                      ><i className="fa-solid fa-bolt icon-list"></i> Local offers</li>
                  </Link>
                  <Link href="/app/product-news" className="link_color">
                      <li
                        className={pathname ==='/app/product-news'?'active':''}
                      ><i className="fa-solid fa-clipboard-list icon-list"></i> Product News</li>
                  </Link>
                  <Link href="/app/local-events" className="link_color">
                        <li className={pathname === '/app/local-events' ? 'active' : ''}><i className="fa-regular fa-calendar icon-list"></i> Local Events</li>
                  </Link>
                  <Link href="/app/local-market" className="link_color">
                        <li className={pathname === '/app/local-market' ? 'active' : ''}><i className="fa-solid fa-bag-shopping icon-list"></i> Local Market</li>
                  </Link>
                  <Link href="/app/local-business" className="link_color">
                                  <li className={pathname === '/app/local-business' || pathname === '/app/local-business-cat' ? 'active' : ''}><i className="fa-solid fa-briefcase icon-list"></i> Local Business</li>
                  </Link>
                  <Link href="/app/local-people" className="link_color">
                                  <li className={pathname === '/app/local-people' || pathname === '/app/local-people-cat' ? 'active' : ''}><i className="fa-solid fa-users icon-list"></i> Local People</li>
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

          <div className="left_menu" style={{ border: `none` }}>
              <ul className="vertical_list">
                  <Link href="/app/settings" className="link_color">
                        <li className={pathname === '/app/settings' ? 'active' : ''} ><i className="fa-solid fa-gear icon-list"></i> Settings</li>
                  </Link>
              </ul>
          </div>
    </>
  )
}

export default LeftMenu
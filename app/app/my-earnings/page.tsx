/* eslint-disable @next/next/no-sync-scripts */
import AppContent from '@/app/components/templates/AppContent'
import Script from 'next/script'
import React, { useEffect } from 'react'

const Page = () => {

    return (
        <>
        
            <AppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-sack-dollar icon-list"></i> My Earnings</h3>
                                </div>
                            </div>
                            <div>
                                {/* <!-- Some codes here --> */}
                            </div>
                        </div>

                        <div className="post_create_btns">
                            <div>
                                <div>
                                    <h5>Total Balance</h5>
                                    <h2><i className="fa-solid fa-indian-rupee-sign"></i>800/-</h2>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h5><i className="fa-regular fa-calendar-days"></i> September</h5>
                                    <h2><i className="fa-solid fa-indian-rupee-sign"></i>80/-</h2>
                                </div>
                            </div>
                        </div>

                        <div className="chart">
                            <canvas id="inlineChart"></canvas>
                        </div>


                        <div className="tab_menu">
                            <div>
                                <h5><i className="fa-solid fa-clipboard-list"></i> Transactions</h5>
                            </div>
                            <div>
                                <h5><i className="fa-solid fa-building-columns"></i> Bank Details</h5>
                            </div>
                            <div>
                                <h5><i className="fa-solid fa-indian-rupee-sign"></i> Withdraw</h5>
                            </div>
                        </div>

                        <div className="bank transaction">
                            <div className="table-bar">
                                <div>
                                    <div>
                                        <button><i className="fa-solid fa-file-pdf"></i> Download</button>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        2/234
                                        <button><i className="fa-solid fa-caret-left"></i></button>
                                        <button><i className="fa-solid fa-caret-right"></i></button>
                                    </p>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sl</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>20/09/2023</td>
                                        <td>Credit</td>
                                        <td><i className="fa-solid fa-indian-rupee-sign"></i>400/-</td>
                                        <td>success</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>20/09/2023</td>
                                        <td>Credit</td>
                                        <td><i className="fa-solid fa-indian-rupee-sign"></i>400/-</td>
                                        <td>success</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>20/09/2023</td>
                                        <td>Credit</td>
                                        <td><i className="fa-solid fa-indian-rupee-sign"></i>400/-</td>
                                        <td>success</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bank bank_details">
                            <div className="table-bar">
                                <div>
                                    <h5>Bank Details <small>(Double Click to Edit)</small></h5>
                                </div>
                                <div>
                                    <p>
                                        <i className="fa-solid fa-indian-rupee-sign"></i>
                                    </p>
                                </div>
                            </div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Full Name</td>
                                        <td>
                                            Mritunjoy Mushahary
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Bank Name</td>
                                        <td>
                                            State Bank India
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IFSC Code</td>
                                        <td>
                                            SDF799DS
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bank bank_details">
                            <div className="table-bar">
                                <div>
                                    <h5>Withdraw</h5>
                                </div>
                                <div>
                                    <p>
                                        <i className="fa-solid fa-indian-rupee-sign"></i>
                                    </p>
                                </div>
                            </div>
                            <div className="single-div-center">
                                <div>
                                    <div>
                                        <input type="text" placeholder="Amount" />
                                    </div>
                                    <button>Withdraw</button>
                                </div>
                            </div>
                        </div>


                    </div>
                }
                rightBar={``}
            ></AppContent>

            
            <Script
                src='js/inline_chart.js'
                type='text/javascript'
            ></Script>
            <Script 
                src='https://cdn.jsdelivr.net/npm/chart.js'
                type='text/javascript'
            ></Script>

            


        </>
    )
}

export default Page


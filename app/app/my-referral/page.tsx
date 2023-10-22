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
                                    <h3><i className="fa-solid fa-users-rays icon-list"></i> My Referral</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {/* <!-- Some code here --> */}
                                </div>
                            </div>
                        </div>

                        <div className="referral_box">
                            <div>
                                <h3>Referral Link</h3>
                            </div>
                            <div>
                                <input type="text" placeholder="Referral Link" />
                            </div>
                            <div>
                                <button><i className="fa-solid fa-copy"></i> Copy</button>
                                <button><i className="fa-solid fa-share"></i> Share</button>
                            </div>
                        </div>

                        <div className="details_list">
                            <div>
                                <p>Total: <b>23</b></p>
                            </div>
                            <div>
                                <p>Active: <b>23</b></p>
                            </div>
                            <div>
                                <p>Others: <b>23</b></p>
                            </div>
                        </div>

                        <div className="bank transaction">
                            <div className="table-bar">
                                <div>
                                    <div>
                                        <h3 className="text-color2">Downline</h3>
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
                                        <th>Full Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Jame Neutron</td>
                                        <td>activated</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Jame Neutron</td>
                                        <td>activated</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Jame Neutron</td>
                                        <td>activated</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Jame Neutron</td>
                                        <td>activated</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                }
                rightBar={``}
            ></AppContent>

        </>
    )
}

export default page
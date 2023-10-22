import AppContent from '@/app/components/templates/AppContent'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>


            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-users icon-list"></i> Local People (34)</h3>
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
                                <Link href="/app/local-people-cat">
                                    <div>
                                        <h3>Software Engineers</h3>
                                        <button>2</button>
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <Link href="/app/local-people-cat">
                                    <div>
                                        <h3>Teachers</h3>
                                        <button>2</button>
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <Link href="/app/local-people-cat">
                                    <div>
                                        <h3>Doctor</h3>
                                        <button>2</button>
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <Link href="/app/local-people-cat">
                                    <div>
                                        <h3>Dentist</h3>
                                        <button>34</button>
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <Link href="/app/local-people-cat">
                                    <div>
                                        <h3>Student</h3>
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

export default page
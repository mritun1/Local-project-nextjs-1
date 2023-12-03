import BlogAppContent from '@/app/components/pages/blogs/BlogAppContent'
import React from 'react'
import Image from 'next/image'

const Page = () => {
    return (
        <>

            <BlogAppContent
                mainContent={
                    <div className="main_content text-color">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-circle-info icon-list"></i> About us</h3>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>

                        <center>
                            <Image 
                            alt="ya" 
                            src="/icons/logo/logo1.png" 
                            width={90}
                            height={130}
                            />
                        </center>


                        <h4>Welcome to localnii.com – Your Hyperlocal Hub for Community, Content, and Commerce!</h4>

                        <p>At localnii.com, we believe that the heart of every community beats in its local pulse. Our platform is designed to be the ultimate destination for hyperlocal content sharing and social commerce, where individuals can connect with their neighborhoods, stay updated on local news and events, and explore a vibrant marketplace tailored to their pin code.</p>

                        <h4>Who We Are:</h4>
                        <p>localnii.com is not just a platform; it`s a digital extension of your community. We understand the importance of staying connected with your neighbors, local events, and businesses, and we`ve created a space where you can do just that. Our mission is to empower communities by providing a seamless and user-friendly platform for hyperlocal interactions.</p>

                        <h4>What Sets Us Apart:</h4>

                        <h4>1. Pin Code Precision:</h4>

                        <ul>
                            <li>Our unique feature allows you to explore content with pinpoint accuracy. No more scrolling through irrelevant information – just enter your pin code, and discover what`s happening in your immediate vicinity.
                                </li>
                        </ul>

                        <h4>2. Local News and Events:</h4>

                        <p>Stay informed about the latest news and events tailored to your neighborhood. Whether it`s a community gathering, a local sports event, or important announcements, you`ll find it all here.</p>
                        
                        <h4>3. Community Groups:</h4>

                        <p>Connect with like-minded individuals in your area through our diverse range of community groups. From hobby enthusiasts to local businesses, discover and engage with groups that matter to you.</p>
                        <h4>4. People Search:</h4>

                        <p>Looking for someone in your neighborhood? Our people search feature lets you find and connect with individuals based on their pin code, fostering a stronger sense of community.</p>
                        <h4>5. Social Commerce:</h4>

                        <p>Explore a hyperlocal marketplace where local businesses can thrive and residents can discover unique products and services right in their vicinity. Support your community by shopping local!</p>
                        <h4>6. Why Choose localnii.com:</h4>
                        <ul>
                            <li><b>Community-Centric Approach:</b> We prioritize building strong local connections.</li>
                            <li><b>User-Friendly Interface:</b> Our platform is designed for easy navigation and seamless user experience.</li>
                            <li><b>Privacy and Security:</b> Your data is secure with us, and we prioritize user privacy.</li>
                        </ul>
                        
                        
                        
                        <p>Join us at localnii.com and become a part of a thriving hyperlocal community. Whether you`re here to share, connect, or shop, we`re here to make your hyperlocal experience unforgettable.</p>

                        <p>localnii.com – Connecting Communities, One Pin Code at a Time!</p>

                    </div>
                }
            ></BlogAppContent>

        </>
    )
}

export default Page
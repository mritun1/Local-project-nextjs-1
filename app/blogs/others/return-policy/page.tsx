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
                                    <h3><i className="fa-solid fa-circle-info icon-list"></i> Terms & Conditions</h3>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>

                        <h3>localnii.com Return Policy for Second-Hand Items and User-Sold Products</h3>

                        <p>Thank you for using localnii.com as your go-to platform for buying and selling second-hand items and products. Please take a moment to review our Return Policy for a clear understanding of the terms and conditions associated with purchases made on our platform:</p>

                        <h4>1. User Responsibility:</h4>

                        <ul>
                            <li>localnii.com acts as a facilitator for users to connect and engage in transactions. It is important for buyers to exercise due diligence and thoroughly inspect items before completing a purchase.</li>
                        </ul>

                        <h4>2. Meet in Person:</h4>

                        <ul>
                            <li>We encourage buyers to meet sellers in person to inspect the item, ask questions, and ensure that the product meets their expectations. This physical interaction provides an opportunity for a transparent and satisfactory transaction.</li>
                        </ul>

                        <h4>3. No Company Sales:</h4>

                        <ul>
                            <li>localnii.com is not involved in the direct sale of any items. The transactions occur solely between users. We do not take possession of any products, and we do not verify the condition or authenticity of items listed on our platform.</li>
                        </ul>

                        <h4>4. Limited Platform Responsibility:</h4>

                        <ul>
                            <li>localnii.com is not responsible for the condition, quality, safety, legality, or authenticity of the items listed by users. We do not guarantee the accuracy of product descriptions or the reliability of sellers.</li>
                        </ul>

                        <h4>5. No Returns Accepted:</h4>

                        <ul>
                            <li>As localnii.com does not engage in the actual sale of products, we do not facilitate returns or refunds. Buyers must address any concerns directly with the seller. It is the responsibility of both parties to establish clear terms and conditions for the sale.</li>
                        </ul>
                        <h4>6. Dispute Resolution:</h4>

                        <ul>
                            <li>In the event of a dispute between a buyer and a seller, localnii.com encourages open communication to resolve the issue amicably. However, localnii.com is not obligated to mediate or arbitrate disputes between users.</li>
                        </ul>
                        <h4>7. Safety Guidelines:</h4>

                        <ul>
                            <li>Users are advised to prioritize safety during in-person meetings. Choose public locations for transactions, inform a friend or family member of your plans, and trust your instincts. localnii.com is not responsible for any incidents that occur during meet-ups.</li>
                        </ul>
                        <h4>8. Reporting Concerns:</h4>

                        <ul>
                            <li>If users encounter fraudulent activity, misrepresentation, or any violation of our platform`s guidelines, we encourage them to report such incidents to localnii.com for further investigation.</li>
                        </ul>
                        

                        <p>By using localnii.com, users acknowledge and agree to these terms, understanding that localnii.com assumes no liability for transactions conducted on the platform. We are committed to fostering a safe and transparent marketplace for our users.</p>

                    </div>
                }
            ></BlogAppContent>

        </>
    )
}

export default Page
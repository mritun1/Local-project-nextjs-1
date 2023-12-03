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

                        <h3>localnii.com Terms and Conditions</h3>

                        <p>Welcome to localnii.com! Before you dive into our hyperlocal community, content sharing, and social commerce platform, please take a moment to read and understand our Terms and Conditions. By accessing or using localnii.com, you agree to comply with and be bound by the following terms and conditions:</p>

                        <h4>1. Acceptance of Terms:</h4>

                        <ul>
                            <li>By accessing or using localnii.com, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our platform.</li>
                        </ul>

                        <h4>2. User Conduct:</h4>

                        <ul>
                            <li>You agree to use localnii.com for lawful purposes only. You will not engage in any activity that violates local, state, national, or international laws and regulations.</li>
                        </ul>

                        <h4>3. Privacy:</h4>

                        <ul>
                            <li>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose information.</li>
                        </ul>

                        <h4>4. Account Registration:</h4>

                        <ul>
                            <li>To access certain features of localnii.com, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information, including your password.</li>
                        </ul>

                        <h4>5. Community Guidelines:</h4>

                        <ul>
                            <li>Users are solely responsible for the content they share on localnii.com. Do not share misleading or harmful information. localnii.com reserves the right to remove any content that violates our policies.</li>
                        </ul>
                        <h4>6. Content Sharing:</h4>

                        <ul>
                            <li>Users are solely responsible for the content they share on localnii.com. Do not share misleading or harmful information. localnii.com reserves the right to remove any content that violates our policies.</li>
                        </ul>
                        <h4>7. Intellectual Property:</h4>

                        <ul>
                            <li>All content and materials on localnii.com, including logos, graphics, and text, are the property of localnii.com and are protected by intellectual property laws. Users may not use, reproduce, or distribute any content without permission.</li>
                        </ul>
                        <h4>8. Termination of Account:</h4>

                        <ul>
                            <li>localnii.com reserves the right to suspend or terminate user accounts for any reason, including violation of these Terms and Conditions.</li>
                        </ul>
                        <h4>9. Changes to Terms:</h4>

                        <ul>
                            <li>localnii.com may update these Terms and Conditions from time to time. It is your responsibility to review these terms periodically, and continued use of the platform constitutes acceptance of any changes.</li>
                        </ul>
                        <h4>10. Limitation of Liability:</h4>

                        <ul>
                            <li>localnii.com is not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the platform.</li>
                        </ul>

                        <p>Thank you for using localnii.com responsibly and respectfully.</p>

                    </div>
                }
            ></BlogAppContent>

        </>
    )
}

export default Page
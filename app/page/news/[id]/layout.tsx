import type { Metadata } from 'next'
import '../../../styles/scss/global.scss'
import BlogContent from '../../../components/pages/blogs/BlogContent'
import BlogMenu from '../../../components/pages/blogs/BlogMenu'

export const metadata: Metadata = {
    title: 'Referral Link',
    description: 'This is the Referral Link for Localnii',
    icons: '/icons/logo/logo1.png'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <main>

            <div>
                <BlogMenu></BlogMenu>
                

                <div className="container_full">
                    <div className="container content_col">

                        <BlogContent></BlogContent>

                        {children}

                    </div>
                </div>



            </div>

        </main>
    )
}

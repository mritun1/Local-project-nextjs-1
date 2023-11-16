import type { Metadata } from 'next'
import '../styles/scss/global.scss'
import MenuModal from '../components/form/MenuModal'
import BlogContent from '../components/pages/blogs/BlogContent'

export const metadata: Metadata = {
    title: 'Localnii - PIN code wise community.',
    description: 'To stay connected locally. Local Social network for business only. Hyper local content sharing platform. PIN code wise community.',
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
                <MenuModal />
                

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

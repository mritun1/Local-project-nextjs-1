import type { Metadata } from 'next'
import '../styles/scss/global.scss'
import MenuModal from '../components/form/MenuModal'
import MainContent from '../components/templates/MainContent'
import MobFootMenu from '../components/pages/mob/MobFootMenu'

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

                        <MainContent></MainContent>

                        {children}

                    </div>
                </div>



            </div>

            <MobFootMenu></MobFootMenu>

        </main>
    )
}

import React from 'react';
import NewsSingleView from "@/app/components/pages/page/news/NewsSingleView"
import type { Metadata, ResolvingMetadata } from 'next'

//---------------------------------------------------------------------------------

type Props = {
    params: { id: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id

    // fetch data
    const product = await fetch(`https://localnii.com/api/posts/news/${id}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    return {
        title: product.data.title,
        description: product.data.des,
        icons: product.data.images[0],
        openGraph: {
            images: [product.data.images[0], ...previousImages],
        },
    }
}
//---------------------------------------------------------------------------------

const Page = ({ params }: Props) => {
    
    return (
        <>
            <NewsSingleView />
        </>
    )
}

export default Page
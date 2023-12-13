import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next'
import SecondHandSingleView from '@/app/components/pages/page/secondhand/SecondHandSingleView';

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
    //let url = 'http://127.0.0.1:3000/';
    let url = 'https://localnii.com/';
    let title = '';
    let des = '';
    let favIcon = '/icons/others/profile.webp';
    const res = await fetch(url+`api/products/second-hand/${id}`,{
        method:'GET'
    })
    if(res.ok){
        const data = await res.json();
        if(data.code === 1){
            title = data.data.productName + ' Price:' + data.data.productPrice;
            des = data.data.productDes
            if (data.data.images){
                favIcon = data.data.images[0];
            }
        }
    }

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    return {
        title: title,
        description: des,
        icons: favIcon,
        openGraph: {
            images: [favIcon, ...previousImages],
        },
    }
}
//---------------------------------------------------------------------------------

const Page = ({ params }: Props) => {
    
    return (
        <>
            <SecondHandSingleView />
        </>
    )
}

export default Page
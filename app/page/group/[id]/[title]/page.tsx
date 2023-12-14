import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next'
import GroupSingleView from '@/app/components/pages/page/group/GroupSingleView';

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
    // let url = 'http://127.0.0.1:3000/';
    let url = 'https://localnii.com/';
    let title = '';
    let favIcon = 'https://cdn.memiah.co.uk/blog/wp-content/uploads/counselling-directory.org.uk/2019/04/shutterstock_1464234134-1024x684.jpg';
    const res = await fetch(url+`api/groups/${id}`,{
        method:'GET'
    })
    if(res.ok){
        const data = await res.json();
        console.log(data)
        if(data.code === 1){
            title = data.data.groupName;
            if (data.data.groupPic){
                favIcon = data.data.groupPic;
            }
        }
    }

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    return {
        title: title,
        description: title,
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
            <GroupSingleView/>
        </>
    )
}

export default Page
"use client"
import GroupsItem from '@/app/components/pages/groups/GroupsItem';
import GroupsMenu from '@/app/components/pages/groups/GroupsMenu';
import ButtonLoading from '@/app/components/temp/ButtonLoading';
import AppContent from '@/app/components/templates/AppContent'
import seenUpdate from '@/app/customlib/seenUpdate';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type groupsItems={
    groupName:String,
    groupPic:String,
    groupPin:Number,
    groupMembers:[],
}

const Page = () => {

    const seenUpdater = new seenUpdate();
    const pathname = usePathname();
    const [isHome, setIsHome] = useState<boolean>(true)
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [pin,setPin] = useState<number | null>(null)

    const menuClickHandle = () =>{
        setIsHome(!isHome)
        setIsSearch(!isSearch)
    }

    useEffect(() => {
        return () => {
            seenUpdater.update(pathname);
        };
    }, []);
    //--------------------------------------------------------
    //LOAD CONTENT - SEARCH - START
    //--------------------------------------------------------
    const [groups, setGroups] = useState<groupsItems[]>([]);
    // const newDate = new customDate();
    // const [pin, setPin] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    // const [notFound, setNotFound] = useState<boolean>(true);
    // const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);
    const [infinityLod, setInfinityLoad] = useState<boolean>(true)
    const [pNum, setPnum] = useState<number>(1);

    const loadGroups = (num: number) => {
        setInfinityLoad(false)
        fetch(`/api/groups/all/${num}/0/`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache, no-store',
            },
        })
            .then(response => response.json())
            .then(data => {
                setPin(data.pin)
                if (data.code === 1) {

                    console.log(data.data)

                    setGroups((prevData) => [...prevData, ...data.data]);
                    setTotal((prevData) => prevData + data.data.length);
                    setPnum((prev) => prev + 1)

                    setInfinityLoad(true)
                } else {
                    setInfinityLoad(true)
                }
            })
    }

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //             loadGroups(pNum);
    //         }
    //     };

    //     // Add the event listener
    //     if (typeof window !== 'undefined') {
    //         window.addEventListener('scroll', handleScroll);
    //     }

    //     // Remove the event listener when the component unmounts
    //     return () => {
    //         if (typeof window !== 'undefined') {
    //             window.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, [pNum]);

    // const seenUpdater = new seenUpdate();
    // const pathname = usePathname();

    useEffect(() => {
        return () => {
            loadGroups(1);
            // seenUpdater.update(pathname);
        };
    }, []);
    //--------------------------------------------------------
    //LOAD CONTENT - SEARCH - END
    //--------------------------------------------------------
    //--------------------------------------------------------
    //LOAD CONTENT - HOME - START
    //--------------------------------------------------------
    const [groupsHome, setGroupsHome] = useState<groupsItems[]>([]);
    // const newDate = new customDate();
    // const [pin, setPin] = useState<number>(0);
    const [totalHome, setTotalHome] = useState<number>(0);
    // const [notFound, setNotFound] = useState<boolean>(true);
    // const [doublyLinkedLists, setDoublyLinkedLists] = useState<DoublyCircularLinkedList[]>([]);
    const [infinityLodHome, setInfinityLoadHome] = useState<boolean>(true)
    const [pNumHome, setPnumHome] = useState<number>(1);

    const loadGroupsHome = (num: number) => {
        setInfinityLoadHome(false)
        fetch(`/api/groups/mygroups/${num}/`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache, no-store',
            },
        })
            .then(response => response.json())
            .then(data => {
                setPin(data.pin)
                if (data.code === 1) {

                    console.log(data.data)

                    setGroupsHome((prevData) => [...prevData, ...data.data]);
                    setTotalHome((prevData) => prevData + data.data.length);
                    setPnumHome((prev) => prev + 1)

                    setInfinityLoadHome(true)
                } else {
                    setInfinityLoadHome(true)
                }
            })
    }

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //             loadGroups(pNum);
    //         }
    //     };

    //     // Add the event listener
    //     if (typeof window !== 'undefined') {
    //         window.addEventListener('scroll', handleScroll);
    //     }

    //     // Remove the event listener when the component unmounts
    //     return () => {
    //         if (typeof window !== 'undefined') {
    //             window.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, [pNum]);

    // const seenUpdater = new seenUpdate();
    // const pathname = usePathname();

    useEffect(() => {
        return () => {
            loadGroupsHome(1);
            // seenUpdater.update(pathname);
        };
    }, []);
    //--------------------------------------------------------
    //LOAD CONTENT - HOME - END
    //--------------------------------------------------------

    return (
        <>
            <AppContent
                mainContent={
                    <div className="main_content" >

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-tag"></i> Groups (0)</h3>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>{pin} <button><i className="fa-solid fa-location-dot"></i></button></h4>
                                </div>
                            </div>
                        </div>

                        <GroupsMenu 
                            menuClick={menuClickHandle}
                            isHome={isHome}
                            isSearch={isSearch}
                            pin={pin}
                        ></GroupsMenu>

                        {isHome?(
                            <>
                                <div className="groups-content">

                                    <h2>Hello</h2>

                                </div>
                                
                            </>
                        ):null}

                        {isSearch?(
                            <>
                                <div className="groups-content">

                                    {groups ? groups.map((ele, index) => (
                                        <GroupsItem
                                            key={index}
                                            name={ele.groupName}
                                            pic={ele.groupPic}
                                            members={ele.groupMembers}
                                        ></GroupsItem>
                                    )) : null}

                                </div>
                                <ButtonLoading
                                    submitLoad={infinityLod}
                                >.</ButtonLoading>
                            </>
                        ):null}


                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default Page
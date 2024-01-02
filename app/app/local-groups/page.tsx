"use client"
import GroupsItem from '@/app/components/pages/groups/GroupsItem';
import GroupsMenu from '@/app/components/pages/groups/GroupsMenu';
import ButtonLoading from '@/app/components/temp/ButtonLoading';
import AppContent from '@/app/components/templates/AppContent'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type groupsItems={
    btn:string,
    item:{
        groupName: String,
        groupPic: String,
        groupPin: Number,
        groupMembers: [],
        _id: String,
    }
}

const LocalGroups = () => {

    
    const pathname = usePathname();
    const [isHome, setIsHome] = useState<boolean>(true)
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [pin,setPin] = useState<number | null>(null)

    const menuClickHandle = () =>{
        setIsHome(!isHome)
        setIsSearch(!isSearch)
    }

    //--------------------------------------------------------
    //LOAD CONTENT - SEARCH - START
    //--------------------------------------------------------
    const [groupsNum, setGroupsNum] = useState<boolean>(true);
    const [groups, setGroups] = useState<groupsItems[]>([]);
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

                    // console.log(data.data)
                    if (data.data.length>0){
                        setGroupsNum(false)
                    }

                    setGroups((prevData) => [...prevData, ...data.data]);
                    setPnum((prev) => prev + 1)

                    setInfinityLoad(true)
                } else {
                    setInfinityLoad(true)
                }
            })
    }

    //--------------------------------------------------------
    //LOAD CONTENT - SEARCH - END
    //--------------------------------------------------------
    //--------------------------------------------------------
    //LOAD CONTENT - HOME - START
    //--------------------------------------------------------
    const [homeNum, setHomeNum] = useState<boolean>(true);
    const [groupsHome, setGroupsHome] = useState<groupsItems[]>([]);
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
                    if(data.data.length > 0){
                        setHomeNum(false)
                    }

                    setGroupsHome((prevData) => [...prevData, ...data.data]);
                    setPnumHome((prev) => prev + 1)

                    setInfinityLoadHome(true)
                } else {
                    setInfinityLoadHome(true)
                }
            })
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadGroups(pNum);
                loadGroupsHome(pNumHome);
            }
        };

        // Add the event listener
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }

        // Remove the event listener when the component unmounts
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [pNumHome, pNum]);

    // const seenUpdater = new seenUpdate();
    // const pathname = usePathname();

    //--------------------------------------------------------
    //LOAD CONTENT - HOME - END
    //--------------------------------------------------------
    useEffect(() => {
        loadGroups(1);
        loadGroupsHome(1);
        return () => {};
    }, []);

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
                            loadGroupsHome={loadGroupsHome}
                            loadGroups={loadGroups}
                        ></GroupsMenu>

                        {isHome?(
                            <>
                                <div className="groups-content">
                                    {groupsHome ? groupsHome.map((ele, index) => (
                                        
                                            <GroupsItem
                                                key={index}
                                                name={ele.item.groupName}
                                                pic={ele.item.groupPic}
                                                members={ele.item.groupMembers}
                                                id={ele.item._id}
                                                btn={ele.btn}
                                            ></GroupsItem>
                                        
                                    )) : null}

                                </div>
                                <ButtonLoading
                                    submitLoad={infinityLodHome}
                                >.</ButtonLoading>

                                {infinityLodHome ? homeNum ?(
                                    <div className="service-not-available">
                                        <div>
                                            <p>You don`t have any groups.</p>
                                            <h2>
                                                <button onClick={menuClickHandle} className='linkBtn'><i className="fa-solid fa-magnifying-glass"></i> Search Groups</button>
                                            </h2>
                                            <h3>Search Local Groups.</h3>
                                        </div>
                                    </div>
                                ):null:null}
                                
                            </>
                        ):null}

                        {isSearch?(
                            <>
                                <div className="groups-content">

                                    {groups ? groups.map((ele, index) => (
                                        <GroupsItem
                                            key={index}
                                            name={ele.item.groupName}
                                            pic={ele.item.groupPic}
                                            members={ele.item.groupMembers}
                                            id={ele.item._id}
                                            btn={ele.btn}
                                        ></GroupsItem>
                                    )) : null}

                                </div>
                                <ButtonLoading
                                    submitLoad={infinityLod}
                                >.</ButtonLoading>

                                {infinityLod ? groupsNum ? (
                                    <div className="service-not-available">
                                        <div>
                                            <p>No Group Found, please create one.</p>
                                            <h3>Search Local Groups.</h3>
                                        </div>
                                    </div>
                                ) : null : null}
                            </>
                        ):null}


                    </div>
                }
                rightBar={``}
            ></AppContent>


        </>
    )
}

export default LocalGroups
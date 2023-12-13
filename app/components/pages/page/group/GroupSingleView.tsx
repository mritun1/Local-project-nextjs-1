"use client"
import LoginBlockDiv from '@/app/components/temp/LoginBlockDiv'
import React, { useEffect, useState } from 'react'
import BlogAppContent from '../../blogs/BlogAppContent'
import GroupsItem from '../../groups/GroupsItem'
import { useParams } from 'next/navigation'

const GroupSingleView = () => {
    const { id } = useParams();
    const [groupName, setGroupName] = useState<string>('')
    const [groupPic, setGroupPic] = useState<string>('')
    const [btn, setBtn] = useState<string>('')
    const [groupMembers, setGroupMembers] = useState<[]>([])
    useEffect(() => {
        const loadGroups = () => {
            fetch(`/api/groups/${id}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache, no-store',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 1) {
                        setGroupName(data.data.groupName)
                        setGroupPic(data.data.groupPic)
                        setBtn(data.data.btn)
                        setGroupMembers(data.data.groupMembers)
                    }
                })
        }
        loadGroups();
        return () => { }
    }, [id])
    return (
        <>
            <LoginBlockDiv></LoginBlockDiv>

            <BlogAppContent
                mainContent={
                    <div className="main_content">

                        <div className="title_bar">
                            <div>
                                <div>
                                    <h3><i className="fa-solid fa-circle-info icon-list"></i> Group</h3>
                                </div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>

                        <div className="groups-content">

                            <GroupsItem
                                key={0}
                                name={groupName}
                                pic={groupPic}
                                members={groupMembers}
                                id={id.toString()}
                                btn={btn}
                            ></GroupsItem>

                        </div>



                    </div>
                }
            ></BlogAppContent>
        </>
    )
}

export default GroupSingleView
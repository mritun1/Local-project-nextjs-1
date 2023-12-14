import React, { useState } from 'react'
import ButtonLoading from '../../temp/ButtonLoading';
import Modal from '../../temp/Modal';
import ImageUploadSingle from '../../templates/ImageUploadSingle';
interface propsType{
    menuClick:()=>void;
    isHome:boolean;
    isSearch:boolean;
    pin:number | null;
    loadGroupsHome:(e:number)=>void;
    loadGroups:(e:number)=>void;
}
const GroupsMenu = (props:propsType) => {
    const [isCreate,setIsCreate] = useState<boolean>(false)

    const [name, setName] = useState<string>("")
    const [pic, setPic] = useState<string>("/icons/others/profile.webp")
    const isCreateHandle = async () =>{
        setIsCreate(!isCreate)
        const res = await fetch("/api/groups/draft/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                check:'checking'
            })
        })
        if(res.ok){
            const data = await res.json()
            console.log(data)
            if(data.code === 1){
                if (data.data.groupName){
                    setName(data.data.groupName)
                }
                if (data.data.groupPic) {
                    setPic(data.data.groupPic)
                }
            }
        }
    }

    const eventUpdate = async (e: any, f: string) => {
        const val = e.target.value
        if (f === "groupName") { setName(val) }
        const res = await fetch("/api/groups/draft/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                [f]: val
            })
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            
        } else {
            console.log("Something error, while creating draft post")
        }
    }
    const [submitBtn, setSubmitBtn] = useState<boolean>(true)
    const submitPost = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitBtn(false)
        const res = await fetch("/api/groups/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pin: props.pin,
            })
        })
        if (res.ok) {
            setSubmitBtn(true)
            const data = await res.json()
            console.log(data)
            setName("")
            setPic("/icons/others/profile.webp")
            setIsCreate(!isCreate)
            props.loadGroupsHome(1)
            props.loadGroups(1)
        } else {
            console.log("something went wrong")
        }
    }
    return (
        <>
            <div className="tab-menu groups">
                <div onClick={props.menuClick} className={props.isHome?'active':''}>
                    <h3>Home</h3>
                </div>
                <div onClick={props.menuClick} className={props.isSearch ? 'active' : ''}>
                    <h3>Search</h3>
                </div>
                <div onClick={isCreateHandle}>
                    <h3>+Add</h3>
                </div>
            </div>

            <Modal
                id="createGroups"
                title="Create Groups"
                isHidden={isCreate}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={isCreateHandle}
            >

                <div id='fromForEvent' className="sign_up_form">
                    <form onSubmit={(e) => submitPost(e)}>

                        <div style={{padding:`3px`}}>
                            <ImageUploadSingle 
                            pic={pic}
                            ></ImageUploadSingle>
                        </div>

                        <div className="sign_up_one_col">
                            <div><input type={'text'} name={'groupName'} placeholder={'Group Name'}
                                onChange={(e) => eventUpdate(e,'groupName')}
                                value={name}
                                required /></div>
                        </div>

                        <p className='text-color'>Pin: {props.pin}</p>

                        <ButtonLoading
                            submitLoad={submitBtn}
                        >
                            <div className="btn-box right">
                                <div>
                                    <button className='save'><i className="fa-solid fa-plus"></i> Create</button>
                                </div>
                            </div>
                        </ButtonLoading>

                    </form>
                </div>
            </Modal>
        </>
    )
}

export default GroupsMenu
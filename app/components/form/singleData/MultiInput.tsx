import React, {  useState } from 'react'
import Modal from '../../temp/Modal'
import ButtonLoading from '../../temp/ButtonLoading'
type propsType = {
    id: string,
    arr: [],
    title: string,
    url:string,
    method:string,
    children: any,
    load:()=>void,
}
const MultiInput = (props:propsType) => {
    const [isHidden, setIsHidden] = useState<boolean>(false)
    const [inputList, setInputList] = useState(['']); // Initial input list

    const handleAddInput = () => {
        setInputList([...inputList, '']); // Add a new input
    };

    const handleInputChange = (index:any, value:any) => {
        const updatedInputs = [...inputList];
        updatedInputs[index] = value;
        setInputList(updatedInputs);
    };
    const [loading,setLoading] = useState(true);
    const handleSubmit = async (e:any) =>{
        e.preventDefault()
        setLoading(false);
        const res = await fetch(props.url,{
            method: props.method,
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                inputList
            })
        })
        if(res.ok){
            showModal();
            props.load();
            setLoading(true);
        }
    }
   
    const showModal = () => {
        setIsHidden(!isHidden)
        const updatedInputs = [...inputList];
        props.arr.map((ele, index) => {
            updatedInputs[index] = ele;
            setInputList(updatedInputs);
        })
    }

    return (
        <>
            <div className="singleData">
                <div>
                    <p>{props.title}</p>
                </div>
                <div>
                    <div>
                        <div>
                            {props.children}
                        </div>
                    </div>
                    <div>
                        <div><button onClick={showModal} ><i className="fa-solid fa-pen-to-square"></i> Edit</button></div>
                    </div>
                </div>
            </div>

            <Modal
                id={props.id}
                title={props.title}
                isHidden={isHidden}
                zIndex={1}
                modalClass={''}
                additionBtn={''}
                closeBtn={showModal}
            >
                <div className="sign_up_form">
                    <form onSubmit={handleSubmit}>

                        {inputList.map((input, index) => (
                            <div key={index} className="sign_up_one_col">
                                <div>
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder='Mobile, Email, Social link, website, etc'
                                        value={input}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        />
                                </div>
                            </div>
                        ))}
                        
                        <ButtonLoading
                            submitLoad={loading}
                        >
                            <div className="btn-box right">
                                <div>
                                    <button onClick={handleAddInput} type='button' className='save'><i className="fa-solid fa-plus"></i> Add Input</button>
                                    <button className='save'><i className="fa-solid fa-floppy-disk"></i> Save</button>
                                </div>
                            </div>
                        </ButtonLoading>

                    </form>
                </div>
            </Modal>
        </>
    )
}

export default MultiInput
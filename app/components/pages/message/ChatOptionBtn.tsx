import React, { useState } from 'react'

const ChatOptionBtn = () => {
    const [isOtions,setIsOptions] = useState<boolean>(false);
    const clickOptions = () =>{
        setIsOptions(!isOtions)
    }
    return (
        <>
            <div>

                <button onClick={clickOptions}><i className="fa-solid fa-plus"></i></button>

                {isOtions?(
                    <div className="more-options-chat">
                        <div>
                            <button title='Contribute'><i className="fa-solid fa-indian-rupee-sign"></i></button>
                        </div>
                        {/* <div>
                        <button><i className="fa-solid fa-plus"></i></button>
                    </div> */}
                    </div>
                ):null}
                

            </div>
        </>
    )
}

export default ChatOptionBtn
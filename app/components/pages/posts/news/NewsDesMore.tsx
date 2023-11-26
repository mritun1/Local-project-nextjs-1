import React, { useState } from 'react'
interface propsType {
    des:string;
}
const NewsDesMore = (pros:propsType) => {
    const [desH, setDesH] = useState<string>('60px')
    const [btn,setBtn] = useState<boolean>(true)
    const showDes = () => {
        setDesH('auto')
        setBtn(!btn)
    }
  return (
    <>
          <div className="news_des" style={{ height: desH }}>
              <div>
                  <p>{pros.des}</p>
              </div>
              {btn?(
                <>
                    <div>
                        <button onClick={showDes}>read more...</button>
                    </div>
                </>
              ):null}
              
          </div>
    </>
  )
}

export default NewsDesMore
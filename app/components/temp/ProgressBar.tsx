import React from 'react'
type propsType = {
    width:string;
    display:boolean;
}
const ProgressBar = (props:propsType) => {
  return (
    <>
        <div className='progressBar' style={{display:props.display?'none':'block'}} >
            <div>
                  <div style={{ width: `${props.width}%` }}><p>uploading...{props.width}% </p></div>
            </div>
        </div>
    </>
  )
}

export default ProgressBar
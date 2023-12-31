import React from 'react'
interface props {
  title:string;
  children:any;
  modalShow:boolean;
  modalClickHandler:(e:string)=>void;
  uId:string;
}
const AdminModal = (props:props) => {
  return (
    <>
      {props.modalShow?(
        <div key={3} className='modal'>
          <div>
            <div className='modalBody'>
              <div className='modalHead'>
                <h3>{props.title} <button onClick={(e)=>props.modalClickHandler(props.uId)} className='btn unpaid'>Close Modal</button></h3>

              </div>
              <div className="modalCont">
                {props.children}

              </div>
            </div>
          </div>
        </div>
      ):null}
      
    </>
  )
}

export default AdminModal
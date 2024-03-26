import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import {createPortal} from "react-dom";

const Modal = ({onClose ,isOpen , children}) => {
  return createPortal(
     <>
     { isOpen && (

     <div 
        className="absolute top-0 z-48 backdrop-blur h-screen w-screen grid place-items-center"
        > 
    
      <div className=" m-auto z-50 relative min-h-[200px] min-w-[50%] max-w-[80%] bg-white p-4">
      <div className="flex justify-end">
       <AiOutlineClose onClick={onClose} className="text-2xl cursor-pointer"/>
      </div>
      {children}
     </div>

     <div onClick={onClose}  className="absolute top-0  z-48 backdrop-blur h-screen w-screen">  
    
     </div>  
     
     </div>
     
     )}
     </>
  , document.getElementById("modal-root")
  );
}

export default Modal
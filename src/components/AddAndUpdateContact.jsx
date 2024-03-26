import React from 'react'
import Modal from './Modal'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addDoc , collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name:Yup.string().required("Name is Required"),
  email:Yup.string().email("Invalid Email").required("Email is Required"),
})
const AddAndUpdateContact = ({isOpen , onClose , isUpdate ,contact}) => {
   
  const addContact = async (contact) => {
     try{
      const contactref = collection(db , "contacts");
      await addDoc(contactref , contact);
      onClose();
      toast.success("Contact Added Sucessfuly")
     } catch(error) {
         
      console.log(error);
     }
  };

  const updateContact = async (contact ,id) => {
    try{
     const contactref = doc(db , "contacts" ,id);
     await updateDoc(contactref , contact);
     onClose();
     toast.success("Contact updated Sucessfuly")
    } catch(error) {
        
     console.log(error);
    }
 };

  return (
    <div> 
         <Modal   isOpen ={isOpen} onClose ={onClose} > 
           <Formik validationSchema={contactSchemaValidation }
           initialValues={ isUpdate ? {
            name:contact.name,
            email:contact.email,
           } 
          : {
            name:"",
            email:"",
          }}
           onSubmit={(values)=>{
            console.log(values);
            isUpdate ? 
            updateContact(values , contact.id) :
            addContact(values);
           }}
           >
            <Form className="flex flex-col gap-4">

            <div className="flex flex-col gap-1"> 
            <label htmlFor = "name">Name</label>
            <Field name = "name" className=" border h-10 "/>
            <div className="text-xs text-red-500"> 
              <ErrorMessage name="name" />
            </div>
            </div>

            <div className="flex flex-col gap-1"> 
            <label htmlFor = "email ">Email </label>
            <Field name ="email" className=" border h-10 "/>
            <div className="text-xs text-red-500"> 
              <ErrorMessage name ="email" />
            </div>
            </div>
             
             <button className=" bg-red-600 px-3 py-1 self-end text-white rounded-md"> 
              {isUpdate ? "update" : "Add"} Contact 
             </button>
            </Form>
           </Formik>
        </Modal>
    </div>
  
  )
}

export default AddAndUpdateContact
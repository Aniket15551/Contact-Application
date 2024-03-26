import { CiCirclePlus } from "react-icons/ci";
import './App.css'
import Navbar from './components/Navbar'
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import {collection,getDocs, onSnapshot} from "firebase/firestore"
import {db} from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFountContact from "./components/NotFountContact";

const App = () =>{

 const[contacts , setContacts] = useState([]);
 const { isOpen , onClose , onOpen } = useDisclouse();
/* const[isOpen , setOpen] = useState(false);

 const onOpen = ()=>{
  setOpen( true );
 }


 const onClose = ()=>{
  setOpen( false );
 } */ 
 useEffect(() => {
  const getContacts = async () => {

    try{
      const contactsRef = collection(db , "contacts");
   
     // console.log(contactsSnapshot);
     onSnapshot(contactsRef ,(snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id:doc.id,
          ...doc.data(),
        };
      });
      setContacts(contactLists);
      return contactLists;
     });
     
    } 
    catch(error){
      console.log("error agya ji ");
    }
  };

  getContacts();
 }, [] );
  
 const filterContacts =(e) => {
  const value = e.target.value;
   
  const contactsRef = collection(db , "contacts");
   
  // console.log(contactsSnapshot);
  onSnapshot(contactsRef ,(snapshot) => {
   const contactLists = snapshot.docs.map((doc) => {
     return {
       id:doc.id,
       ...doc.data(),
     };
   });
   const filteredContacts = contactLists.filter( contact => 
    contact.name.toLowerCase().includes(value.toLowerCase()));
   setContacts(filteredContacts);
   return filteredContacts;
  });

 };


  return (
    <> 
     <div className="mx-auto max-w-[370px] px-4">
      <Navbar/>
      <div className="flex gap-2"> 

      <div className="flex relative items-center flex-grow">
      <CiSearch className="text-white text-3xl absolute ml-1 "/>
        <input onChange={filterContacts}
        type="text" placeholder="Search Contact" 
        className=" border  bg-transparent border-white rounded-md h-10 flex-grow text-white pl-9 " />
      </div>

      <div> 
      <CiCirclePlus onClick={onOpen} className="text-5xl  text-white cursor-pointer "/>
      </div>

      </div>
      <div className="mt-4 gap-3 flex flex-col">
        {
          contacts.length <= 0 ? <NotFountContact/> : contacts.map((contact) =>(
         <ContactCard key = {contact.id} contact = {contact}/>
        ))}
      </div>
     </div>
    
    <AddAndUpdateContact
    onClose={onClose}
    isOpen={isOpen}/>

    <ToastContainer position="bottom-center" />
    </>
    
   
  )
}

export default App

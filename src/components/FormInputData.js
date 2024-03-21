
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection,addDoc } from 'firebase/firestore'; // แก้ไขการนำเข้าโมดูลนี้
import { Link } from 'react-router-dom';

const FormInputData = ()=>{

    const [form,setForm] = useState({})

    const handleChange= (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleAddData =async()=>{
        await addDoc(collection(db,"user_student"),form)
        .then((res)=>{ 
            console.log(res)
        }).catch(err=>console.log(err))
    }

    return(
        <>
            <input onChange={(e)=>handleChange(e)} type='text' name='name' placeholder='name'/><br/>
            <input onChange={(e)=>handleChange(e)} type='text' name='email' placeholder='email'/><br/>
            <input onChange={(e)=>handleChange(e)} type='text' name='section' placeholder='section'/><br/>
           <button onClick={handleAddData}>Sign up</button>
           <Link to="/classroom">Go to Classroom</Link>
        </>
    );
}

export default FormInputData;
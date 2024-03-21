
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, doc,getDocs,updateDoc } from 'firebase/firestore'; // แก้ไขการนำเข้าโมดูลนี้


const Attendance = () => {
    const [form,setForm] = useState({});
    const [data,setData] = useState([]);
    const [editId,setEditId] = useState(null);
    const user_studneRef = collection(db, "user_student")

    useEffect(() => {
        loadData(); // เรียกใช้ฟังก์ชัน loadData ใน useEffect
    }, []);

    const handleChange= (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const loadData = async () => {
        await getDocs(collection(db,"user_student"))
            .then((query)=>{
                
                const newData = query.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }));
                setData(newData)
            })
            .catch(err=>console.log(err))
    }
    const handleSave= async(id)=>{
        try{
            await updateDoc(doc(user_studneRef,id),form)
            setEditId(null)
        }catch(err){
            console.log(err)

        }
    }
    console.log(editId)

    return (
        <div>
            <h2>Random Name:</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>name</th>
                        <th>email</th>
                        <th>section</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index)=>
                        <tr key={index}>
                            <th>{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.section}</td>
                            <td>
                                {editId=== item.id 
                                    ? (
                                    <>
                                        <input
                                            onChange={(e) => handleChange(e)}
                                            type="text"
                                            name="status"
                                            value={form.status !== undefined ?form.status: item.status}
                                            placeholder='status'
                                        />
                                    </>)
                                    : (item.status)
                                }
                        
                            </td>
                            <td>
                                {editId === item.id
                                ?(<>
                                    <button onClick={()=> handleSave(item.id)}>Save</button>
                                </>)
                                :(
                                    <>
                                        <button onClick={()=> setEditId(item.id)}>Edit status</button>
                                    </>
                                )
                                }
                                
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    );
};

export default Attendance;


import Nav from './Nav'
import React from 'react';
import '../styles/StudentDashboard.css';
const StudentDashboard = ()=>{
    return(
        <>
        <Nav/>
        <div className='header'>
            
        </div>
        <div className='container'>
            <form className='content form-student'>
                <h3>โปรดกรอกรหัสเพื่อเข้าสู่ห้องเรียน</h3>
                <input placeholder='Room code' required></input>
                <button>Enter</button>
            </form>
        </div>
        </>
    );
}

export default StudentDashboard;
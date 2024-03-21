import Nav from './Nav'
import React from 'react';
import '../styles/StudentDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const StudentDashboard = ()=>{
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setRoomCode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // เช็คว่ารหัสที่ผู้ใช้ป้อนตรงกับรหัสที่คุณต้องการหรือไม่
        if (roomCode === 'J456321') {
            // ถ้าตรงกัน ให้ทำการนำทางไปยังหน้า Attendance หรือทำการดำเนินการอื่นตามที่คุณต้องการ
            navigate('/formInputData');
        } else {
            console.log(roomCode)
            // ถ้ารหัสไม่ตรงกัน ให้ทำการแสดงข้อความผิดพลาดหรือทำการแจ้งเตือนผู้ใช้
            alert('Incorrect room code. Please try again.');
        }
    };

    return(
        <>
            <div className='dashboard'>
                <div className='col'>
                    <form onSubmit={handleSubmit} className='create-question-form'>
                        <h1>Enter the room</h1>
                        <label htmlFor='roomCode'>Room Code</label>
                        <input
                            type='text'
                            id='roomCode'
                            name='roomCode'
                            value={roomCode} // กำหนดค่า value ของ input เป็นค่า roomCode ที่ถูกเก็บใน state
                            onChange={handleInputChange} // เมื่อมีการเปลี่ยนแปลงใน input ให้เรียกใช้ handleInputChange
                            required
                        />
                        <button type='submit'>Enter</button>
                    </form>

                </div>
            </div>
        </>
    );
}

export default StudentDashboard;
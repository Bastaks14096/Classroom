import Nav from './Nav';
import { useState } from 'react';
import '../styles/Dashboard.css'
import { useNavigate } from 'react-router-dom';


const TeacherDashboard = () => {
    const [question, setQuestion] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // เพิ่มโค้ดส่วนการสร้างคำถาม
    //     console.log('Create question:', question);
    //     // เพิ่มโค้ดส่วนส่งคำถามไปยังเซิร์ฟเวอร์
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // เช็คว่ารหัสที่ผู้ใช้ป้อนตรงกับรหัสที่คุณต้องการหรือไม่
        if (question === 'J456321') {
            // ถ้าตรงกัน ให้ทำการนำทางไปยังหน้า Attendance หรือทำการดำเนินการอื่นตามที่คุณต้องการ
            navigate('/attendance');
        } else {
            console.log(question)
            // ถ้ารหัสไม่ตรงกัน ให้ทำการแสดงข้อความผิดพลาดหรือทำการแจ้งเตือนผู้ใช้
            alert('Incorrect room code. Please try again.');
        }
    };

    return (
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
                            value={question} // กำหนดค่า value ของ input เป็นค่า roomCode ที่ถูกเก็บใน state
                            onChange={handleInputChange} // เมื่อมีการเปลี่ยนแปลงใน input ให้เรียกใช้ handleInputChange
                            required
                        />
                        <button type='submit'>Enter</button>
                    </form>

                </div>
            </div>
        </>
        
    );
};

export default TeacherDashboard;

import Nav from './Nav';
import { useState } from 'react';
import '../styles/Dashboard.css'
import Attendance from './Attendance';

const TeacherDashboard = () => {
    const [question, setQuestion] = useState('');

    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // เพิ่มโค้ดส่วนการสร้างคำถาม
        console.log('Create question:', question);
        // เพิ่มโค้ดส่วนส่งคำถามไปยังเซิร์ฟเวอร์
    };

    return (
        <>
            <Attendance/>

            <div className='dashboard'>
                <div className='col'>
                    
                    <button className='create-question-btn'>Create Question</button>
                    <form onSubmit={handleSubmit} className='create-question-form'>
                        <h1>Create New Question</h1>
                        <label htmlFor='question'>Question</label>
                        <input
                            type='text'
                            id='question'
                            name='question'
                            value={question}
                            onChange={handleInputChange}
                            required
                        />
                        <button type='submit'>Create</button>
                    </form>
                </div>
            </div>
            
        </>
    );
};

export default TeacherDashboard;

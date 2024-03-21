import React, { useState, useEffect } from 'react';
import '../styles/Room.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const port = process.env.Environment || 'http://localhost:5000'
// const port = 'https://classroom-api-three.vercel.app';

const RoomStudent = ({ roomId }) => {
    const [room, setRoom] = useState(null);
    const [questionText, setQuestionText] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [newAnswer, setNewAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRoomData = async () => {
        try {
            const db = getFirestore();
            const roomDocRef = doc(db, 'room_sections', roomId);
            const roomSnapshot = await getDoc(roomDocRef);
            if (roomSnapshot.exists()) {
                setRoom({ id: roomSnapshot.id, ...roomSnapshot.data() });
                setQuestionText(roomSnapshot.data().questions[0].question);
            }
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoomData();
    }, [roomId]);

    const ansQuestion = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post(`${port}/api/room/answer`, {
                question:questionText,
                email: localStorage.getItem('userEmil'),
                name: localStorage.getItem('userName'),
                answer: newAnswer
            });
            if (response.status === 200) {
                alert('Answer submitted successfully.');
                setNewAnswer('');
                fetchRoomData(); // Fetch updated room data after successful submission
            } else {
                throw new Error('Failed to submit answer.');
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            alert('Failed to submit answer. Please try again.');
        }
    };

    const handleNewAnswerChange = (e) => {
        setNewAnswer(e.target.value);
    };

    const showRoom = () => {
        setExpanded(!expanded);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className='room-box' onClick={showRoom}>
                <h1>{room ? room.subject : 'Loading...'}</h1>
                <p>section: {room ? room.section : 'Loading...'}</p>
            </div>
            {expanded && (
                <div className='room'>
                    <p onClick={showRoom} className='back-btn'><FontAwesomeIcon icon={faArrowLeft} /> Back</p>
                    <h1>{room ? room.subject : 'Loading...'}</h1>
                    <p>section: {room ? room.section : 'Loading...'}</p>

                    <div className='content-room'>
                        <h1>คำถามทั้งหมด</h1>
                        {room && room.questions && room.questions.reverse().map((question, index) => (
                            <div key={index} className='q-col'>
                                <h2 className='question'>{question.question}</h2>
                                <form onSubmit={ansQuestion}>
                                    <input
                                        placeholder='Type your answer here'
                                        value={newAnswer}
                                        onChange={(e) => handleNewAnswerChange(e)}
                                    ></input>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default RoomStudent;

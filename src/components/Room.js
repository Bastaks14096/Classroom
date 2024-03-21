import { useState, useEffect } from 'react';
import '../styles/Room.css';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Room = ({ roomId }) => {
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [ans, setAns] = useState(false);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const db = getFirestore();
                const roomDocRef = doc(db, 'room_sections', roomId);
                const roomSnapshot = await getDoc(roomDocRef);

                if (roomSnapshot.exists()) {
                    setRoom({ id: roomSnapshot.id, ...roomSnapshot.data() });
                } else {
                    setError(new Error('Room not found.'));
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching room data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchRoomData();
    }, [roomId]); // Update the dependency array to include roomId

    const createQuestion = async () => {
        try {
            const db = getFirestore();
            const roomDocRef = doc(db, 'room_sections', roomId);
    
            // Get the current document data
            const roomSnapshot = await roomDocRef.get();
            const roomData = roomSnapshot.data();
    
            // Define the new question object
            const newQuestion = {
                question: 'New question', // You can replace this with the actual input value
                answers_list: {}, // Initialize with an empty array
            };
    
            // Update the array field by pushing the new item
            await updateDoc(roomDocRef, {
                questions: arrayUnion(newQuestion), // Use the correct field name for questions array
            });
    
            console.log('Question added successfully.');
        } catch (error) {
            console.error('Error adding question:', error); // Log the error for debugging
        }
    };

    const showRoom = () => {
        setExpanded(!expanded);
    };

    const toggleAns = () => {
        setAns(!ans);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!room) {
        return <div>No room found.</div>;
    }

    console.log(room)

    return (
        <>
            <div className='room-box' onClick={showRoom}>
                <h1>{room.subject}</h1>
                <p>section: {room.section}</p>
            </div>
            {expanded && (
                <div className='room'>
                    <p onClick={showRoom} className='back-btn'><FontAwesomeIcon icon={faArrowLeft} /> Back</p>
                    <h1>{room.subject}</h1>
                    <p>section: {room.section}</p>

                    <div className='content-room'>
                        <form onSubmit={createQuestion}>
                            <input placeholder='สร้างคำถาม'></input>
                            <button>สร้าง</button>
                        </form>

                        <h1>คำถามทั้งหมด</h1>
                        {room.questions.map((question, index) => (
                            <div key={index} className='q-col'>
                                <h2 className='question'>{question.question} <span className='num_count'>{question.answers_list.length}</span></h2>
                                <p onClick={toggleAns} className='q-btn'>แสดงทั้งหมด</p>
                                {ans && (
                                    <ul>
                                        {question.answers_list.map((answer, ansIndex) => (
                                            <li key={ansIndex}>
                                                <p className='user-ans'>Answer: {answer.answer}</p>
                                                <p className='user-name'>{answer.name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Room;

import Nav from './Nav'
import '../styles/Dashboard.css';

const TeacherDashboard = ()=>{
    return(
        <>
        <Nav/>
        <div className='dashboard'>
            <div className='col'>
                <button>Create question</button>
                <form>
                    <h1>Create new question</h1>
                    <label>Question</label>
                    <input type='text' required></input>
                    <button>Create</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default TeacherDashboard;
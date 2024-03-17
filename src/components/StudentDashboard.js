import Nav from './Nav'

const StudentDashboard = ()=>{
    return(
        <>
        <Nav/>
        <div className='container'>
            <form className='content form-student'>
                <input placeholder='Room code' required></input>
                <button>Enter</button>
            </form>
        </div>
        </>
    );
}

export default StudentDashboard;
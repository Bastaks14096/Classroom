

const RB=ReactBootstrap;
const {Alert, Card, Button, Table} = ReactBootstrap;

class App extends React.Component {
    title = (
      <div className="alert alert-info" role="alert">
        <b>Project :</b> classroom
      </div>
    );
  
    footer = (
      <div>
        <br />
      </div>
    );
  
    state = {
      scene: 0,
      students: [],
      randomStudents: [],
      stdid: "",
      stdtitle: "",
      stdfname: "",
      stdlname: "",
      stdemail: "",
      stdphone: "",
      
    };
  
    componentDidMount() {
      // ดึงข้อมูลนักเรียนจาก Firebase Firestore
      db.collection("students").get().then((querySnapshot) => {
        const students = [];
        querySnapshot.forEach((doc) => {
          const studentData = doc.data();
          students.push({ id: doc.id, ...studentData });
        });
        // อัพเดท state ด้วยข้อมูลนักเรียนที่ดึงมา
        this.setState({ students: students });
      });
  
      // เรียกใช้ getRandomStudentsFromFirestore และส่งพารามิเตอร์
      getRandomStudentsFromFirestore(1).then((randomStudents) => {
        this.setState({ randomStudents: randomStudents });
      }).catch((error) => {
        console.error("เกิดข้อผิดพลาดในการสุ่มรายชื่อ:", error);
      });
    }
  
    render() {
      return (
        <div className="card">
          <div className="card-header">{this.title}</div>
          <div className="card-body">
            <div>
              <StudentTable data={this.state.students} app={this} />
            </div>
            <div className="card-body">
            <div>
                <StudentTable data={this.state.randomStudents} app={this} />
            </div>
            </div>
          </div>
          <div className="card-footer">{this.footer}</div>
        </div>
      );
    }
  }
  

const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);



const firebaseConfig = {
  apiKey: "AIzaSyBlh3BQp2XAjyMxb00wZ-TBS78RKtT7elo",
  authDomain: "web2566-47d9e.firebaseapp.com",
  projectId: "web2566-47d9e",
  storageBucket: "web2566-47d9e.appspot.com",
  messagingSenderId: "244933640486",
  appId: "1:244933640486:web:a47cc9f5653d7f673981e7",
  measurementId: "G-9HRFG9Q4WR"
};
firebase.initializeApp(firebaseConfig);      
const db = firebase.firestore();


// React component for StudentTable
function StudentTable({ data, app }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>รหัส</th>
          <th>คำนำหน้า</th>
          <th>ชื่อ</th>
          <th>สกุล</th>
          <th>email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.title}</td>
            <td>{s.fname}</td>
            <td>{s.lname}</td>
            <td>{s.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function getRandomStudentsFromFirestore(numStudents) {
    return db.collection("students").get().then((querySnapshot) => {
      const students = [];
      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        students.push({ id: doc.id, ...studentData });
      });
      
      // สุ่มเลือกรายชื่อจาก students array
      const randomStudents = [];
      for (let i = 0; i < numStudents; i++) {
        const randomIndex = Math.floor(Math.random() * students.length);
        randomStudents.push(students[randomIndex]);
      }
  
      return randomStudents;
    });
  }
  
  
  



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


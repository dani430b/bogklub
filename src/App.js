import './App.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import  app from "./firebase";
import React, { useState } from "react";
import ReactDOM from 'react-dom/client';


function App() {
  const auth = getAuth(app);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const signUp = () => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert("Account created")
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      alert(errorCode)
    });
  };

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert("Signed In")
    })
    .catch((error) => {
      const errorCode = error.code;
    alert(errorCode)
  })
  };

  const signout = () => {
    signOut(auth)
    .then(() => {
      alert("Signed Out")
  // Sign-out successful.
    }).catch((error) => {
      const errorCode = error.code;
  // An error happened.
      alert(errorCode)
    });
  };

/*
  class LoginControl extends React.Component{
    constructor(props) {
      super(props);
      this.handleLoginClick = 
      this.handleLoginClick.bind(this);
      this.handleLogoutClick = 
      this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: false};
    };
  
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    };
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    };
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
  
      if (isLoggedIn) {
        button = <LogoutButton onClick= 
        {this.handleLogoutClick}/>;
      } else {
        button = <LoginButton onClick=
        {this.handleLoginClick}/>;
      }
      return (
        <div>
          {button}
        </div>
      )
    }
  }
  
  function LoginButton(props) {
    return (
      <>
      <input type={"email"} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
      <input type={"password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/> 
      <button onClick={props.onClick}>
        Login
      </button>
      </>
    )
  }
  
  function LogoutButton(props) {
    signIn();
    return (
      <button onClick={props.onClick}>
        <div>
          Logout
        </div>
      </button>
    )
  }
  
  
  const root = ReactDOM.createRoot(document.getElementById('root')); 
  root.render(<LoginControl />);
  */

  return (
    <>
      <div className="App">
        <input type={"email"} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type={"password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/> 

        <button onClick={signUp}>Create account</button>
        <button onClick={signIn}>Login</button>
        <button onClick={signout}>Logout</button>
      </div> 
    </>   
    );
}

export default App;

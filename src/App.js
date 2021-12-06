import './App.css';
import Imessage from './Components/Imessage';
import Login from './Components/Login';
import {useDispatch, useSelector} from "react-redux"
import { selectUser, login , logout } from './features/userSlice';
import { useEffect } from 'react';
import {auth} from "./firebaseConfig"

function App() {

  const user  = useSelector(selectUser);
  const dispach = useDispatch();




  useEffect(()=>{
      auth.onAuthStateChanged(authUser=>{
        if(authUser){
            dispach(login({uid: authUser.uid, photo: authUser.photoURL, email:authUser.email, displayName:authUser.displayName}))
        }
        else{
            dispach(logout());
        }
      })
  }, [])

  return (
    <div className="App">
        {user ? (
          <Imessage/>
        ): <Login/>}
    </div>
  );
}

export default App;

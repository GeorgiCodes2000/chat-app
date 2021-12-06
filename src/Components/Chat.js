import { MicNoneOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import "./Chat.css"
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName } from "../features/chatSlice";
import db from "../firebaseConfig"
import firebase from "@firebase/app-compat";
import {selectUser} from "../features/userSlice"
import FlipMove from "react-flip-move";

const Chat = () => {
    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
   const [messages, setMessages] = useState([]);
    const chatName = useSelector(selectChatName);
   const chatId= useSelector(selectChatId);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
        })
        setInput("");
    }

    useEffect(()=>{
        if(chatId){
            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapShot=>(
                setMessages(snapShot.docs.map(doc=>(
                    {
                        id:doc.id,
                        data: doc.data()
                    }
                )))
            ));
        }
    }, [chatId])

    return(
        <div className="chat">
            <div className="chat_header">
                <h4>To: <span className="chat_name">{chatName}</span></h4>
                <strong>Details</strong>
            </div>


            <div className="chat_messages">
                <FlipMove>
                {messages.map(message=>(
                    <Message key = {message.id} contents={message.data}/>
                ))}
                </FlipMove>
            </div>

            <div className="chat_input">
                <form>
                    <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="iMessage"></input>
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                
                <IconButton>
                   <MicNoneOutlined className="chat_mic"/>
                </IconButton>
            </div>
        </div>
    );
}

export default Chat;
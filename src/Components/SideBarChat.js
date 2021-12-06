import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./SideBarChat.css"
import {setChat} from "../features/chatSlice"
import db from "../firebaseConfig";
import  * as timeago from "timeago.js"

const SideBarChat = ({id,chatName}) => {

    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);

    useEffect(()=>{
        db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc')
        .onSnapshot(snapshot=>{
            return setChatInfo(snapshot.docs.map(doc=>doc.data()))
        })
    }, [id])

    return (
        <div  onClick={()=>dispatch(setChat({chatId: id, chatName: chatName}))} className="sidebarChat">
            <Avatar src={chatInfo[0]?.photo}/>
            <div className="sideBarChat_info">
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <small>{timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}</small>
            </div>
        </div>
    )
}

export default SideBarChat; 
import "./SideBar.css"
import {Avatar} from "@material-ui/core"
import SearchIcon from '@mui/icons-material/Search';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { IconButton } from "@mui/material";
import SideBarChat from "./SideBarChat";
import {useSelector} from "react-redux"
import {selectUser} from '../features/userSlice'
import db, { auth } from "../firebaseConfig"; 
import { useEffect, useState } from "react";

const Sidebar = () => {

    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(()=>{
        db.collection('chats').onSnapshot(snapshot=>{
            setChats(snapshot.docs.map(doc=>{
                return(
                   { 
                    id: doc.id,
                    data: doc.data()
                    }
                )
            }))
        })
    }, [])

    const addChat = () => {
        const chatName = prompt('Please enter a chat name');
        if(chatName){
            db.collection('chats').add({
                chatName:chatName
            })
        }
        
    }

    return(
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar onClick={()=>auth.signOut()} className="sidebar_avatar" src={user.photo}/>
                <div className="sidebar_input">
                    <SearchIcon/>
                    <input placeholder="Search"/>
                </div>
                <IconButton variant="outlined" className="sidebar_inputButton">
                    <RateReviewIcon onClick={addChat}   />
                </IconButton>
                
            </div>

            <div className="sidebar_chats">
               
                {chats.map(({id, data:{chatName}})=>{
                    return(
                        <SideBarChat key={id} id={id} chatName={chatName}/>
                    )
                })}
                 
            </div>
        </div>
    )
}

export default Sidebar;
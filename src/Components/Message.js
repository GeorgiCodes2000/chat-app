import "./Message.css"
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { forwardRef } from "react";

const Message = forwardRef(({id, contents:{timestamp, displayName, email, message, photo, uid}}, ref) => {

    const user = useSelector(selectUser);

    return(
        <div ref={ref} className={`message ${user.email === email && 'message_sender'}`}>
            <Avatar src={photo} className="message_photo"/>
            <p>{message}</p>
            <small>{timestamp?new Date(timestamp.toDate()).toLocaleString():null}</small>
        </div>
    );
})

export default Message;
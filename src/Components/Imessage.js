import Chat from "./Chat";
import "./Imessage.css"
import Sidebar from "./SideBar";

const Imessage = () => {

    return(
        <div className="imessage">
            <Sidebar/>
            <Chat/>
        </div>
    );
}

export default Imessage;
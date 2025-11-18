import { useSelector } from "react-redux";
import { selectPopUpData } from "selectors";
import "./pop-up.scss";
import { PopUpMessage } from "./PopUpMessage";

const PopUp = () => {
    const { messages } = useSelector(selectPopUpData);
    
//dispatch(addPopUpMessages({id: crypto.randomUUID(), text: "какое-то-сообщение 1", type: POPUPMESSAGE.SUCCESS}));
    
    return(
        <div className="pop-up-container">
            {
                messages.map(x => 
                    <PopUpMessage key={x.id} message={x}/>
                )
            }
        </div>
    )
}

export { PopUp };
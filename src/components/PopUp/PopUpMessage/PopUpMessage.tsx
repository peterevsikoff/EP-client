import { deletePopUpMessages } from "action-creators";
import { Close } from "components";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCommonData } from "selectors";
import type { IPopUpMessage } from "types";

const PopUpMessage = ({ message }: {
        message: IPopUpMessage,
    }) => {

    const { language } = useSelector(selectCommonData);
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            if(ref.current) ref.current.classList.add("pop-up-run");
        }, 300);
        setTimeout(() => {
            dispatch(deletePopUpMessages(message.id));
        }, 5300)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div ref={ref} className={`pop-up-message pop-up-${message.type}`}>
            <div className="pop-up-title">
                <span>{language[message.type]}</span>
                <button onClick={() => dispatch(deletePopUpMessages(message.id))}>
                    <Close/>
                </button>
            </div>
            <div className="pop-up-body">
                {message.text}
            </div>
        </div>
    )
}

export { PopUpMessage };
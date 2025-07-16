import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "action-creators";
import { selectUserData } from "selectors";
import "./user.scss";

const User = () => {
    const { user } = useSelector(selectUserData);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    // console.log(user, user?.id);
    return(
        <div className="user">
            {user?.email}
        </div>
    )
}

export { User };
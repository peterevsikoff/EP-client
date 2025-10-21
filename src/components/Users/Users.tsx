import { loadUsers } from "action-creators";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminData, selectCommonData } from "selectors";
import "./users.scss";

const Users = () => {
    const { language } = useSelector(selectCommonData);
    const { users } = useSelector(selectAdminData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className="user-container">
            {
                users ?
                <>
                    {
                        users.length > 0 ?
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>{language.email}</th>
                                    <th>{language.created_at}</th>
                                    <th>{language.verified}</th>
                                    <th>{language.role}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [...users].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).map((x, i) => 
                                        <tr key={x.id}>
                                            <td>{i + 1}</td>
                                            <td>{x.email}</td>
                                            <td>{new Date(x.created_at).toLocaleString([], {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                                            <td>{x.isVerified ? "True" : "False"}</td>
                                            <td>{x.role}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table> :
                        "Нет добавленных пользователей"
                    }
                </> :
                "Loading..."
            }
        </div>
    )
}

export { Users };
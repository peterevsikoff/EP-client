import { loadUsers } from "action-creators";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminData, selectCommonData } from "selectors";

const Users = () => {
    const { language } = useSelector(selectCommonData);
    const { users } = useSelector(selectAdminData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div>
            {
                users ?
                <>
                    {
                        users.length > 0 ?
                        <table>
                            <thead>
                                <tr>
                                    <th>{language.email}</th>
                                    <th>{language.created_at}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(x => 
                                        <tr key={x.id}>
                                            <td>{x.email}</td>
                                            <td>{x.created_at}</td>
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
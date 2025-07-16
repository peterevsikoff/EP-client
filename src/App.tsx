import { Home, User } from "components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BODY } from "types";

const App = () => {
  

  return (
    <BrowserRouter>
        {/* <User/> */}
        {/* <Header/> */}
        <Routes>
            <Route path="/">
                <Route index element={<Home/>}></Route>
                <Route path={BODY.SIGN_UP}>
                    <Route index element={<User/>}></Route>
                    {/* <Route path=":id" element={canProtected(roles, BODY.PROJECTS) ? <SelectedProject/> : <PageNotFound notAccess/>}></Route> */}
                </Route>
                <Route path="*" element={<div>404</div>}></Route>
            </Route>
        </Routes>
        {/* <Footer/> */}
    </BrowserRouter>
  )
}

export { App };

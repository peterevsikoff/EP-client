import { Header, Home, SignUp } from "components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGES } from "types";

const App = () => {
  

  return (
    <BrowserRouter>
        {/* <User/> */}
        <Header/>
        <Routes>
            <Route path="/">
                <Route index element={<Home/>}></Route>
                <Route path={PAGES.SIGN_UP}>
                    <Route index element={<SignUp/>}></Route>
                </Route>
                <Route path="*" element={<div>404</div>}></Route>
            </Route>
        </Routes>
        {/* <Footer/> */}
    </BrowserRouter>
  )
}

export { App };

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import {ToastContainer} from "react-toastify";
import MainPanel from "./pages/layout/MainPanel";
import PrivateRoute from "./component/PrivateRoute";

function App() {
    return (
        <div>
            <ToastContainer position={"bottom-left"} autoClose={5000} theme={"dark"}/>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Login/>}/>
                    <Route path={"/main"}
                           element={
                               <PrivateRoute>
                                   <MainPanel/>
                               </PrivateRoute>
                           }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

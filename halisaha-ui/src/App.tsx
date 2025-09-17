import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import {ToastContainer} from "react-toastify";
import MainPanel from "./pages/layout/MainPanel";

function App() {
    return (
        <div>
            <ToastContainer position={"bottom-left"} autoClose={5000} theme={"dark"}/>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Login/>}/>
                    <Route path={"/main"} element={<MainPanel/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

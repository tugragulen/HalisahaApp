import React from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import {ToastContainer} from "react-toastify";
function App() {
    return (
        <div>
            <ToastContainer position={"bottom-left"} autoClose={5000} theme={"dark"}/>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

import React from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

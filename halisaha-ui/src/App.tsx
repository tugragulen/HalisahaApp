import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import {ToastContainer} from "react-toastify";
import PrivateRoute from "./component/PrivateRoute";
import DashboardView from "./pages/layout/DashboardView";
import CreateMatch from "./pages/match/CreateMatch";

function App() {
    return (
        <div>
            <ToastContainer position={"bottom-left"} autoClose={5000} theme={"dark"}/>
            <Router>
                <Routes>
                    <Route path={"/auth"} element={
                        <Login/>
                    }/>
                    <Route path={"/"}
                           element={
                               <PrivateRoute>
                                   <DashboardView/>
                               </PrivateRoute>
                           }
                    />
                    <Route path={"/match/create"}
                           element={
                               <PrivateRoute>
                                   <CreateMatch/>
                               </PrivateRoute>
                           }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

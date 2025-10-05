import React from 'react';
import {Navigate} from "react-router-dom";

type PropType = {
    children: React.JSX.Element;
}

const PrivateRoute = ({children}: PropType) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to={"/auth"} replace/>
    }

    return children;
};

export default PrivateRoute;
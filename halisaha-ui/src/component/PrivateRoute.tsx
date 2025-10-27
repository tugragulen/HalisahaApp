import React from 'react';
import {Navigate, useLocation} from "react-router-dom";

type PropType = {
    children: React.JSX.Element;
}

const PrivateRoute = ({children}: PropType) => {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        return <Navigate to={"/auth"} state={{from: location}} replace/>
    }

    return children;
};

export default PrivateRoute;
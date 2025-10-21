import React, {useEffect} from 'react';
import {Rest} from "../api/Rest";
import {useDispatch} from "react-redux";
import {setUser} from "./slices/UserSlice";
import {Toast} from "../util/Toast";

const Init = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        Rest.get("user")
            .then((res) => {
                dispatch(setUser(res.data))
            })
            .catch(() => Toast.error("Cannot get user"))
    }, []);

    return (
        <>
        </>
    );
};

export default Init;
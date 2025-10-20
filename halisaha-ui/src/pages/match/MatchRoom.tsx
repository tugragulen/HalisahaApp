import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Toast} from "../../util/Toast";
import {Rest} from "../../api/Rest";
import {MatchResponse} from "../../model/MatchModel";
import MatchTable from "./MatchTable";

const MatchRoom = () => {
    const navigate = useNavigate();
    const [matchList, setMatchList] = useState<MatchResponse[]>([]);

    useEffect(() => {
        Rest.get("match")
            .then(res => setMatchList(res.data))
            .catch(() => Toast.error("Cannot get matches"))
    }, []);

    const handleCreateMatch = () => {
        navigate("/match/create");
    };

    return (
        <>
            <Box display={'flex'} justifyContent={'center'}>
                <Button variant={"contained"} onClick={handleCreateMatch}>
                    MAÇ OLUŞTUR
                </Button>
            </Box>
            <MatchTable matchList={matchList}/>
        </>

    );
};

export default MatchRoom;
import React from 'react';
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MatchRoom = () => {
    const navigate = useNavigate();

    const handleCreateMatch = () => {
        navigate("/match/create");
    };

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <Button variant={"contained"} onClick={handleCreateMatch}>
                MAÇ OLUŞTUR
            </Button>
        </Box>
    );
};

export default MatchRoom;
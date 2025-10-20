import React from 'react';
import {MatchResponse} from "../../model/MatchModel";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip,} from "@mui/material";
import {Accessibility, SupervisorAccount} from '@mui/icons-material';
import {useSelector} from "react-redux";
import {RootState} from "../../store/Store";

type PropType = {
    matchList: MatchResponse[];
}

const MatchTable = ({matchList}: PropType) => {
    const user = useSelector((state: RootState) => state.UserSlice.user);

    const isOwner = (match: MatchResponse) => {
        return match.ownerUsername === user?.username;
    }

    const isAdmin = (match: MatchResponse) => {
        if (!user) return false;
        return match.admins.includes(user.username);
    }

    return (
        <TableContainer component={Paper} sx={{maxWidth: 600, margin: "auto", mt: 4}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Match Name</strong></TableCell>
                        <TableCell><strong>Location</strong></TableCell>
                        <TableCell><strong>Accesibility</strong></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {matchList.map((match, index) => (
                        <TableRow key={index}>
                            <TableCell>{match.name}</TableCell>
                            <TableCell>{match.location}</TableCell>
                            <TableCell>
                                <Tooltip title={isOwner(match) ? "Owner" : "Not Owner"}>
                                    <Accessibility color={isOwner(match) ? "success" : "disabled"}/>
                                </Tooltip>
                                <Tooltip title={isAdmin(match) ? "Admin" : "Not Admin"}>
                                    <SupervisorAccount color={isAdmin(match) ? "success" : "disabled"}/>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MatchTable;
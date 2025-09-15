import React, {PropsWithChildren} from 'react';
import {Box} from "@mui/material";

const FormBoxView = ({children}: PropsWithChildren) => {
    return (
        <Box paddingX={"3%"} height={"90%"}
             display={"flex"} justifyContent={'space-around'} alignItems={'center'} flexDirection={"column"}>
            {children}
        </Box>
    );
};

export default FormBoxView;
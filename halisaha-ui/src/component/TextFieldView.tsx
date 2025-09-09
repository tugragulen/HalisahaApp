import React from 'react';
import {TextField, TextFieldProps as MuiTextFieldProps} from "@mui/material";

const TextFieldView = ({...props}: MuiTextFieldProps) => {
    return (
        <TextField
            variant={"filled"}
            {...props}
        />
    );
};

export default TextFieldView;
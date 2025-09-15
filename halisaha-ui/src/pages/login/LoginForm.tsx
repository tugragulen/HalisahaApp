import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import TextFieldView from "../../component/TextFieldView";
import FormBoxView from "../../component/FormBoxView";

const LoginForm = () => {
    return (
        <FormBoxView>
            <Box>
                <Typography sx={{textAlign: 'center'}} variant={"h3"}>
                    Giriş Yap
                </Typography>
                <Typography sx={{textAlign: 'center', marginTop: "0.5vh"}}>
                    Halısaha uygulamasına hoşgeldiniz, lütfen giriş yapın.
                </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} width={"100%"}>
                <TextFieldView label={"Kullanıcı Adı"} margin={"dense"}/>
                <TextFieldView label={"Şifre"} type={"password"} margin={"dense"}/>
            </Box>
            <Button variant={"outlined"} fullWidth>Giriş</Button>
        </FormBoxView>
    );
};

export default LoginForm;
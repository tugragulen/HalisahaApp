import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import TextFieldView from "../component/TextFieldView";

const Login = () => {
    return (
        <Box height={"100vh"} display={'flex'} justifyContent={'center'} alignItems={'center'}
             sx={{
                 backgroundImage: `url(/background.jpg)`,
                 // backgroundRepeat: "no-repeat",
                 backgroundSize: "cover",
                 // height: "385px",
             }}>
            <Box height={"40%"} width={"25%"} border={"1px solid green"} padding={"3%"} borderRadius={"12px"}
                 display={"flex"} justifyContent={'space-between'} alignItems={'center'} flexDirection={"column"}
            bgcolor={'whitesmoke'} sx={{opacity: 0.95}}>
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
            </Box>
        </Box>
    );
};

export default Login;
import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import TextFieldView from "../../component/TextFieldView";
import FormBoxView from "../../component/FormBoxView";
import {Rest} from "../../api/Rest";
import {LoginModel} from "../../model/LoginModel";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();

    const onLogin = () => {
        if (isFormValid()) {
            const request: LoginModel = {
                username: username!,
                password: password!
            };
            Rest.post("auth/login", request)
                .then((response) => {
                    localStorage.setItem("token", response.data);
                    navigate("/main")
                })
                .catch(() => console.log("Cannot success"));
        }
    }

    const isFormValid = () => {
        return username && password;
    }

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
                <TextFieldView label={"Kullanıcı Adı"} margin={"dense"}
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                />
                <TextFieldView label={"Şifre"} type={"password"} margin={"dense"}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Button variant={"outlined"} fullWidth onClick={onLogin} disabled={!isFormValid()}>
                Giriş
            </Button>
        </FormBoxView>
    );
};

export default LoginForm;
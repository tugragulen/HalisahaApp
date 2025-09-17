import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import TextFieldView from "../../component/TextFieldView";
import FormBoxView from "../../component/FormBoxView";
import {Rest} from "../../api/Rest";
import {SignUpModel} from "../../model/SignUpModel";
import {Toast} from "../../util/Toast";

const SignUpForm = () => {
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const onSignUp = () => {
        if (isFormValid()) {
            const request: SignUpModel = {
                username: username!,
                email: email!,
                password: password!
            };
            Rest.post("auth/signup", request)
                .then(() => {
                    Toast.success("Lütfen doğrulama için mailinizi kontrol edin.")
                    clearForm();
                })
                .catch(() => Toast.error("Kaydolma işlemi başarısız oldu. Username ve Email unique olmalıdır."));
        }

    }

    const isFormValid = () => {
        return username && isEmailValid() && password;
    }

    const isEmailValid = () => {
        return email?.includes("@");
    }

    const clearForm = () => {
        setEmail("");
        setUsername("");
        setPassword("");
    }

    return (
        <FormBoxView>
            <Box>
                <Typography sx={{textAlign: 'center'}} variant={"h3"}>
                    Kayıt Ol
                </Typography>
                <Typography sx={{textAlign: 'center', marginTop: "0.5vh"}}>
                    Giriş yapabilmek için lütfen kaydolun.
                </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} width={"100%"}>
                <TextFieldView label={"Email"} value={email}
                               onChange={(e => setEmail(e.target.value))}
                               type={"email"} margin={"dense"}/>
                <TextFieldView label={"Kullanıcı Adı"} margin={"dense"}
                               value={username} onChange={(e) => setUsername(e.target.value)}
                />
                <TextFieldView label={"Şifre"} type={"password"} margin={"dense"}
                               value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Button variant={"outlined"} fullWidth onClick={onSignUp} disabled={!isFormValid()}>
                Kayıt Ol
            </Button>
        </FormBoxView>
    );
};

export default SignUpForm;
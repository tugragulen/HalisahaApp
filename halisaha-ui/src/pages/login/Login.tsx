import React, {useState} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Login = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }

    const getContent = () => {
        if (tabValue === 0) {
            return <LoginForm/>
        } else if (tabValue === 1) {
            return <SignUpForm/>
        }
    }

    return (
        <Box height={"100vh"} display={'flex'} justifyContent={'center'} alignItems={'center'}
             sx={{
                 backgroundImage: `url(/background.jpg)`,
                 backgroundSize: "cover",
             }}>

            <Box height={"50%"} width={"25%"} border={"1px solid green"} borderRadius={"12px"}
                 bgcolor={'whitesmoke'} sx={{opacity: 0.95}}>
                <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Giriş Yap"/>
                    <Tab label="Kayıt Ol"/>
                </Tabs>
                {getContent()}
            </Box>
        </Box>
    );
};

export default Login;
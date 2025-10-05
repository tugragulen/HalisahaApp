import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {MenuOptionModel} from "../../model/MenuModel";
import MatchRoom from "../match/MatchRoom";

const drawerWidth = 240;


const menuOptions: MenuOptionModel[] = [
    {
        id: 1,
        name: "Maç Odası",
        component: <MatchRoom/>,
    },
]

export default function DashboardView() {
    const [activePage, setActivePage] = useState<MenuOptionModel>(menuOptions[0]);

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx=
                {{
                    background: 'green',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Halısaha Uygulaması
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        background: 'rgb(229,225,225)',
                        boxSizing: 'border-box'
                    },
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {menuOptions.map((option) => (
                            <ListItem key={option.id} disablePadding
                                      sx={{
                                          bgcolor: activePage.id === option.id ? "green" : ""
                                      }}
                            >
                                <ListItemButton onClick={() => setActivePage(option)}>
                                    <ListItemText primary={option.name}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                {activePage.component}
            </Box>
        </Box>
    );
}

import React, {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip
} from "@mui/material";
import {Email as EmailIcon} from "@mui/icons-material";
import {Rest} from "../../api/Rest";
import {Toast} from "../../util/Toast";

type PropType = {
    roomId: string;
}

const Invite = ({roomId}: PropType) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState<string>("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInvite = () => {
        console.log("email", email)
        Rest.post("invite", {roomId, invitedMail: email})
            .then(() => Toast.success("Davet gönderildi."))
            .catch(() => Toast.warning("Davet gönderilemedi."))
    }

    return (
        <>
            <Tooltip title="Maça Davet Et">
                <IconButton color="primary" onClick={() => setOpen(true)}>
                    <EmailIcon/>
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Maça Davet Et</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        <TextField
                            label="Davet edilecek e-posta adresi"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>İptal</Button>
                    <Button
                        onClick={handleInvite}
                        variant="contained"
                        color="primary"
                        disabled={!emailRegex.test(email)}
                    >
                        Daveti Gönder
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Invite;

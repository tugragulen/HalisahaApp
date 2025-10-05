import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginResponseModel} from "../../model/LoginModel";

interface UserState {
    user: LoginResponseModel | undefined;
}

const initialState: UserState = {
    user: undefined
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<LoginResponseModel>) => {
            state.user = action.payload;
        },
    }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
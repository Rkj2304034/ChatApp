import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "user",
    initialState : {
        authUser : null,
        otherUsers : null,
        selectedUser : null,
        tempUsers : null,
        onlineUsers : null,
        loading : true
    },
    reducers : {
        setAuthUser : (state,action) => {
            state.authUser = action.payload;
        },
        setOtherUsers : (state,action) => {
            state.otherUsers = action.payload;
            state.tempUsers = action.payload;
        },
        setSelectedUser : (state,action) => {
            state.selectedUser = action.payload;
        },
        setTempUsers : (state,action) => {
            state.tempUsers = action.payload;
        },
        setOnlineUsers : (state,action) => {
            state.onlineUsers = action.payload;
        },
        setLoading : (state,action) => {
            state.loading = action.payload;
        }
    }
})

export const {setAuthUser,setOtherUsers, setLoading, setSelectedUser,setTempUsers,setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;
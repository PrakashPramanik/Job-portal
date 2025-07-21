import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'auth',
    initialState: {
        loading:false,
        user:null
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload
        },

        setUser:(state,action)=>{
            // console.log(action)
            // console.log(state.user)
            state.user = action.payload
            // console.log(state.user)
        }
    }
})


export  const {setLoading, setUser } = authSlice.actions


export default authSlice.reducer;




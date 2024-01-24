import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../user/userSlice';

const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = 'http://192.168.3.110:8000';
const usersUrl = `${apiUrl}/api/usuarios/`;
// const deletePlantUrl = (plantId) => `${apiUrl}/delete_plant/${plantId}`;
export const getUsers = createAsyncThunk(
  'users/getUsers',
  async(_, { getState })=>{
    const state = getState()
    console.log(state.user.user.token)

    const config = {
        headers: {
          Authorization: `token ${state.user.user.token}`,
        },
      };
    const request = await axios.get(usersUrl, config)
    const response = await request.data;
    console.log(response)

    return response
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser', async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
});

export const usersSlice = createSlice({
  name: 'users',
  initialState:{
    loading: false,
    users: [],
    error: null,
  },
  reducers:{
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getUsers.pending,(state)=>{
      state.loading = true;
      state.users = null;
      state.error = null;
    })
    .addCase(getUsers.fulfilled,(state, action)=>{
      state.loading = true;
      state.users = action.payload;
      state.error = null;
    })
    .addCase(getUsers.rejected,(state, action)=>{
      state.loading = false; 
      state.users = null;
      console.log(action.error.message);
      if(action.error.message === 'Request failed with status code 403'){
        state.error = 'Acceso denegado! credenciales incorrectas'
      }else{
        state.error = action.error.message;
      }
    })
  }
})

export const selectUsers = (state) => state.users.users;
export const errorUsers = (state) => state.users.error;
export const loadingUsers = (state) => state.users.loading;

// export const { changeMode } =
//   usersSlice.actions;
export default usersSlice.reducer;

// /* eslint-disable no-param-reassign */
// /* eslint-disable no-nested-ternary */
// import { createSlice } from '@reduxjs/toolkit';

// const apiUrl = 'http://localhost:8000';
// const loginUrl = `${apiUrl}/login/`;
// // const deletePlantUrl = (plantId) => `${apiUrl}/delete_plant/${plantId}`;

// const initialState = {
//   token: null,
//   user: {
//     Id: import.meta.env.VITE_WEB_USER_ID,
//     FirstName: '',
//     LastName: '',
//   },
//   mode: localStorage.getItem('mode')
//     ? localStorage.getItem('mode')
//     : window.matchMedia('(prefers-color-scheme: dark)').matches
//     ? 'dark'
//     : 'light',
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.token = action.payload.AccessToken;
//       state.user = action.payload.User;
//     },
//     logOut: (state) => {
//       state.user = { Id: import.meta.env.VITE_WEB_USER_ID };
//       state.token = null;
//       localStorage.removeItem('user');
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//     changeMode: (state) => {
//       if (state.mode === 'light') {
//         state.mode = 'dark';
//         localStorage.setItem('mode', 'dark');
//       } else {
//         state.mode = 'light';
//         localStorage.setItem('mode', 'light');
//       }
//     },
//     loginUser: async (state, action) => {
//       const { username, password } = action.payload;

//       try {
//         const response = await fetch(loginUrl, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           dispatch(setCredentials(data));
//           console.log(data)
//         } else {
//           // Manejar errores de inicio de sesión
//           console.error('Error de inicio de sesión');
//         }
//       } catch (error) {
//         console.error('Error al realizar la solicitud:', error);
//       }
//     },
//   },
// });

// export const { setCredentials, logOut, setToken, changeMode, loginUser } =
//   userSlice.actions;

// export const selectUser = (state) => state.user.user;

// export const selectToken = (state) => state.user.token;

// export const selectMode = (state) => state.user.mode;

// export default userSlice.reducer;


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8000';
const loginUrl = `${apiUrl}/login/`;
// const deletePlantUrl = (plantId) => `${apiUrl}/delete_plant/${plantId}`;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async(userCredential)=>{
    const request = await axios.post(loginUrl, userCredential)
    const response = await request.data;
    console.log(response)
    localStorage.setItem('user', JSON.stringify(response));
    return response
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState:{
    loading: false,
    user: null,
    error: null,
    mode: localStorage.getItem('mode')
      ? localStorage.getItem('mode')
      : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  },
  reducers:{
    changeMode: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        localStorage.setItem('mode', 'dark');
      } else {
        state.mode = 'light';
        localStorage.setItem('mode', 'light');
      }
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending,(state)=>{
      state.loading = true;
      state.user = null;
      state.error = null;
    })
    .addCase(loginUser.fulfilled,(state, action)=>{
      state.loading = true;
      state.user = action.payload;
      state.error = null;
    })
    .addCase(loginUser.rejected,(state, action)=>{
      state.loading = false; 
      state.user = null;
      console.log(action.error.message);
      if(action.error.message === 'Request failed with status code 403'){
        state.error = 'Acceso denegado! credenciales incorrectas'
      }else{
        state.error = action.error.message;
      }
    })
  }
})

export const selectMode = (state) => state.user.mode;
export const selectUser = (state) => state.user.user;
export const errorUser = (state) => state.user.error;
export const loadingUser = (state) => state.user.loading;

export const { setCredentials, logOut, setToken, changeMode } =
  userSlice.actions;
export default userSlice.reducer;

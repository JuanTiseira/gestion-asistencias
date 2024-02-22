import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = 'http://192.168.3.110:8000';
const loginUrl = `${apiUrl}/login/`;
// const deletePlantUrl = (plantId) => `${apiUrl}/delete_plant/${plantId}`;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userCredential) => {
    const request = await axios.post(loginUrl, userCredential);
    const response = await request.data;
    console.log(response.token, response.username);
    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('token', response.token);
    localStorage.setItem('rol', response.rol);
    console.log(response);
    return response;
  },
);
const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
});
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: getUserFromLocalStorage(),
    error: null,
    mode: localStorage.getItem('mode')
      ? localStorage.getItem('mode')
      : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  },
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === 'Request failed with status code 403') {
          state.error = 'Acceso denegado! credenciales incorrectas';
        } else {
          state.error = action.error.message;
        }
      });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
    });
  },
});

export const selectMode = (state) => state.user.mode;
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.user.token;
export const errorUser = (state) => state.user.error;
export const loadingUser = (state) => state.user.loading;

export const { changeMode } = userSlice.actions;
export default userSlice.reducer;

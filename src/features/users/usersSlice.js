import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../user/userSlice';

const apiUrl = import.meta.env.VITE_API_URL;
const usersEndpoint = '/api/usuarios/';
const usersModifyEndpoint = '/api/usuarios/edit_user/';
const rolsEndpoint = '/api/rol/';

const usersUrl = `${apiUrl}${usersEndpoint}`;
const usersModifyUrl = `${apiUrl}${usersModifyEndpoint}`;
const rolsUrl = `${apiUrl}${rolsEndpoint}`;
const UserUrlId = (userId) => `${usersUrl}${userId}`;
const deleteUserUrl = (userId) => `${usersUrl}${userId}`;

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.delete(deleteUserUrl(userId), config);
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response) {
        throw new Error(error.response.data.error || 'Error desconocido');
      } else if (error.request) {
        throw new Error('No se recibió respuesta del servidor');
      } else {
        throw new Error('Error al configurar la solicitud');
      }
    }
  },
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.post(usersUrl, userData, config);
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response) {
        // Si hay una respuesta del servidor con un mensaje de error personalizado
        throw new Error(error.response.data.error || 'Error desconocido');
      } else if (error.request) {
        // Si la solicitud se hizo pero no se recibió una respuesta del servidor
        throw new Error('No se recibió respuesta del servidor');
      } else {
        // Si ocurrió un error durante la configuración de la solicitud
        throw new Error('Error al configurar la solicitud');
      }
    }
  },
);

export const modifyUser = createAsyncThunk(
  'users/modifyUser',
  async (userData, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.post(usersModifyUrl, userData, config);
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response) {
        // Si hay una respuesta del servidor con un mensaje de error personalizado
        throw new Error(error.response.data.error || 'Error desconocido');
      } else if (error.request) {
        // Si la solicitud se hizo pero no se recibió una respuesta del servidor
        throw new Error('No se recibió respuesta del servidor');
      } else {
        // Si ocurrió un error durante la configuración de la solicitud
        throw new Error('Error al configurar la solicitud');
      }
    }
  },
);

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { getState }) => {
    const state = getState();
    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };
    const request = await axios.get(usersUrl, config);
    const response = await request.data;
    return response;
  },
);

export const getRols = createAsyncThunk(
  'users/getRols',
  async (_, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };
    const request = await axios.get(rolsUrl, config);
    const response = await request.data;

    return response;
  },
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
});
export const getUserById = createAsyncThunk(
  'alumnos/getUserById',
  async (userId, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };
    try {
      const response = await axios.get(UserUrlId(userId), config);
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response) {
        throw new Error(error.response.data.error || 'Error desconocido');
      } else if (error.request) {
        throw new Error('No se recibió respuesta del servidor');
      } else {
        throw new Error('Error al configurar la solicitud');
      }
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    users: null,
    user: null,
    roles: [],
    error: null,
    result: null,
    selectedUser: null,
    formData: '',
  },
  reducers: {
    changeFormData: (state, action) => {
      state.formData = action.payload;
    },
    selectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // view usuarios
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = null;
        console.log(action.error.message);
        if (action.error.message === 'Request failed with status code 403') {
          state.error = 'Acceso denegado! credenciales incorrectas';
        } else {
          state.error = action.error.message;
        }
      });
    // view roles
    builder.addCase(getRols.pending, (state) => {
      state.loading = true;
      state.roles = null;
      state.error = null;
    });
    builder.addCase(getRols.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload;
      state.error = null;
    });
    builder.addCase(getRols.rejected, (state, action) => {
      state.loading = false;
      state.roles = null;
      console.log(action.error.message);
      if (action.error.message === 'Request failed with status code 403') {
        state.error = 'Acceso denegado! credenciales incorrectas';
      } else {
        state.error = action.error.message;
      }
    });
    // create users
    builder.addCase(createUser.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.result = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      state.users.push(action.payload); // Asumiendo que el servidor devuelve el nuevo usuario
      state.error = null;
      state.result = action.payload.message;
    });

    builder.addCase(createUser.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
      state.result = null;
    });

    // deleteUser reducer
    builder.addCase(deleteUser.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.result = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      // Filtrar el usuario eliminado
      state.users = state.users.filter((user) => user.id !== action.meta.arg);
      state.error = null;
      state.result = action.payload.message;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
      state.result = null;
    });
    // modify users
    builder.addCase(modifyUser.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.result = null;
    });
    builder.addCase(modifyUser.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      state.users.push(action.payload); // Asumiendo que el servidor devuelve el nuevo usuario
      state.error = null;
      state.result = action.payload.message;
    });

    builder.addCase(modifyUser.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
      state.result = null;
    });
    // get user by id
    builder.addCase(getUserById.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.user = null;
      state.result = null;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      state.user = action.payload; // Asumiendo que el servidor devuelve el nuevo usuario
      state.error = null;
      state.result = action.payload.message;
    });

    builder.addCase(getUserById.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
      state.result = null;
    });
  },
});

export const selectUsers = (state) => state.users.users;
export const errorUsers = (state) => state.users.error;
export const resultUsers = (state) => state.users.result;
export const loadingUsers = (state) => state.users.loading;
export const getFormData = (state) => state.users.formData;
export const getRoles = (state) => state.users.roles;
export const selectedUserData = (state) => state.users.selectedUser;
export const userData = (state) => state.users.user;

export const { changeFormData, selectedUser } = usersSlice.actions;
export default usersSlice.reducer;

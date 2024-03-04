import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../user/userSlice';

const apiUrl = import.meta.env.VITE_API_URL;
const asistenciaEndpoint = '/api/asistencia/';
const asistenciaModifyEndpoint = '/api/asistencia/edit_asistencia/';
const carrerasEndpoint = '/api/carrera/';
const materiasEndpoint = '/api/materia/';

const asistenciaUrl = `${apiUrl}${asistenciaEndpoint}`;
const asistenciaModifyUrl = `${apiUrl}${asistenciaModifyEndpoint}`;
const carrerasUrl = `${apiUrl}${carrerasEndpoint}`;
const materiasUrl = `${apiUrl}${materiasEndpoint}`;

const AsistenciaUrlId = (asistenciaId) => `${asistenciaUrl}${asistenciaId}`;

export const deleteAsistencia = createAsyncThunk(
  'asistencias/deleteAsistencia',
  async (asistenciaId, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.delete(AsistenciaUrlId(asistenciaId), config);
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

export const getAsistenciaById = createAsyncThunk(
  'asistencias/getAsistenciaById',
  async (asistenciaId, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.get(AsistenciaUrlId(asistenciaId), config);
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

export const createAsistencia = createAsyncThunk(
  'asistencias/createAsistencia',
  async (asistenciaData, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.post(asistenciaUrl, asistenciaData, config);
      console.log(response.data);
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

export const modifyAsistencia = createAsyncThunk(
  'asistencias/modifyAsistencia',
  async (asistenciaData, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.post(asistenciaModifyUrl, asistenciaData, config);
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

export const getAsistencias = createAsyncThunk(
  'asistencias/getAsistencias',
  async (_, { getState }) => {
    const state = getState();
    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };
    const request = await axios.get(asistenciaUrl, config);
    const response = await request.data;
    return response;
  },
);
export const filterAsistencias = createAsyncThunk(
  'asistencias/filterAsistencias',
  async (params, { getState }) => {
    const state = getState();
    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
      params: params, // Pasar los parámetros recibidos a la solicitud
    };
    const request = await axios.get(asistenciaUrl, config);
    const response = await request.data;
    return response;
  },
);
export const getCarreras = createAsyncThunk(
  'asistencias/getCarreras',
  async (_, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };
    const request = await axios.get(carrerasUrl, config);
    const response = await request.data;

    return response;
  },
);
export const getMaterias = createAsyncThunk(
  'asistencias/getMaterias',
  async (_, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };
    const request = await axios.get(materiasUrl, config);
    const response = await request.data;

    return response;
  },
);
export const getMateriasByCarrera = createAsyncThunk(
  'asistencias/getMateriasByCarrera',
  async (params, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
      params: params,
    };
    const request = await axios.get(materiasUrl, config);
    const response = await request.data;

    return response;
  },
);
export const AsistenciasSlice = createSlice({
  name: 'asistencias',
  initialState: {
    loading: false,
    asistencias: [],
    asistencia: null,
    materias: [],
    carreras: [],
    error: null,
    result: null,
    selectedAsistencia: null,
    formData: '',
  },
  reducers: {
    changeFormData: (state, action) => {
      state.formData = action.payload;
    },
    selectedAsistencia: (state, action) => {
      state.selectedAsistencia = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // view asistencias
      .addCase(getAsistencias.pending, (state) => {
        state.loading = true;
        state.asistencias = null;
        state.error = null;
      })
      .addCase(getAsistencias.fulfilled, (state, action) => {
        state.loading = false;
        state.asistencias = action.payload;
        state.error = null;
      })
      .addCase(getAsistencias.rejected, (state, action) => {
        state.loading = false;
        state.asistencias = null;
        if (action.error.message === 'Request failed with status code 403') {
          state.error = 'Acceso denegado! credenciales incorrectas';
        } else {
          state.error = action.error.message;
        }
      });
    // view carreras
    builder.addCase(getCarreras.pending, (state) => {
      state.loading = true;
      state.carreras = null;
      state.error = null;
    });
    builder.addCase(getCarreras.fulfilled, (state, action) => {
      state.loading = false;
      state.carreras = action.payload;
      state.error = null;
    });
    builder.addCase(getCarreras.rejected, (state, action) => {
      state.loading = false;
      state.carreras = null;
      if (action.error.message === 'Request failed with status code 403') {
        state.error = 'Acceso denegado! credenciales incorrectas';
      } else {
        state.error = action.error.message;
      }
    });
    // filter asistencias
    builder.addCase(filterAsistencias.pending, (state) => {
      state.loading = true;
      state.asistencias = null;
      state.error = null;
    });
    builder.addCase(filterAsistencias.fulfilled, (state, action) => {
      state.loading = false;
      state.asistencias = action.payload;
      state.error = null;
    });
    builder.addCase(filterAsistencias.rejected, (state, action) => {
      state.loading = false;
      state.asistencias = null;
      if (action.error.message === 'Request failed with status code 403') {
        state.error = 'Acceso denegado! credenciales incorrectas';
      } else if (action.error.message === 'Request failed with status code 404') {
        state.error = 'No se encontraron resultados para la solicitud.';
      } else {
        state.error = action.error.message;
      }
    });
    // view materias
    builder.addCase(getMaterias.pending, (state) => {
      state.loading = true;
      state.materias = null;
      state.error = null;
    });
    builder.addCase(getMaterias.fulfilled, (state, action) => {
      state.loading = false;
      state.materias = action.payload;
      state.error = null;
    });
    builder.addCase(getMaterias.rejected, (state, action) => {
      state.loading = false;
      state.materias = null;
      if (action.error.message === 'Request failed with status code 403') {
        state.error = 'Acceso denegado! credenciales incorrectas';
      } else {
        state.error = action.error.message;
      }
    });
    // view materias by carrera

    builder.addCase(getMateriasByCarrera.pending, (state) => {
      state.loading = true;
      state.materias = null;
      state.error = null;
    });
    builder.addCase(getMateriasByCarrera.fulfilled, (state, action) => {
      state.loading = false;
      state.materias = action.payload;
      state.error = null;
    });
    builder.addCase(getMateriasByCarrera.rejected, (state, action) => {
      state.loading = false;
      state.materias = null;
      if (action.error.message === 'Request failed with status code 403') {
        state.error = 'Acceso denegado! credenciales incorrectas';
      } else {
        state.error = action.error.message;
      }
    });
    // create asistencia
    builder.addCase(createAsistencia.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.result = null;
    });
    builder.addCase(createAsistencia.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      state.asistencias.push(action.payload); // Asumiendo que el servidor devuelve el nuevo usuario
      state.error = null;
      state.result = action.payload.message;
    });

    builder.addCase(createAsistencia.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      state.error = action.error.message;
      state.result = null;
    });

    // delete asistencia
    builder.addCase(deleteAsistencia.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.result = null;
    });
    builder.addCase(deleteAsistencia.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      // Filtrar el usuario eliminado
      state.asistencias = state.asistencias.filter(
        (asistencia) => asistencia.id !== action.meta.arg,
      );
      state.error = null;
      state.result = action.payload.message;
    });
    builder.addCase(deleteAsistencia.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      state.error = action.error.message;
      state.result = null;
    });

    // modify asistencia
    builder.addCase(modifyAsistencia.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.result = null;
    });
    builder.addCase(modifyAsistencia.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      state.asistencias.push(action.payload); // Asumiendo que el servidor devuelve el nuevo usuario
      state.error = null;
      state.result = action.payload.message;
    });

    builder.addCase(modifyAsistencia.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      state.error = action.error.message;
      state.result = null;
    });
    // view asistencias by id
    builder.addCase(getAsistenciaById.pending, (state) => {
      state.loading = true;
      state.asistencia = null;
      state.error = null;
    });
    builder.addCase(getAsistenciaById.fulfilled, (state, action) => {
      state.loading = false;
      state.asistencia = action.payload;
      state.error = null;
    });
    builder.addCase(getAsistenciaById.rejected, (state, action) => {
      state.loading = false;
      state.asistencia = null;
      if (action.error.message === 'Request failed with status code 403') {
        state.error = 'Acceso denegado! credenciales incorrectas';
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const selectAsistencias = (state) => state.asistencias.asistencias;
export const errorAsistencias = (state) => state.asistencias.error;
export const resultAsistencias = (state) => state.asistencias.result;
export const loadingAsistencias = (state) => state.asistencias.loading;
export const selectCarreras = (state) => state.asistencias.carreras;
export const selectMaterias = (state) => state.asistencias.materias;
export const getFormData = (state) => state.asistencias.formData;
export const getAsistencia = (state) => state.asistencias.asistencia;

export const { changeFormData, selectedAsistencia } = AsistenciasSlice.actions;
export default AsistenciasSlice.reducer;

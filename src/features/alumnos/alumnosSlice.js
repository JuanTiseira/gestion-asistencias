import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../user/userSlice';

const apiUrl = import.meta.env.VITE_API_URL;
const alumnoEndpoint = '/api/alumno/';
const alumnoModifyEndpoint = '/api/alumno/edit_alumno/';
const rolsEndpoint = '/api/rol/';
const carrerasEndpoint = '/api/carrera/';
const materiasEndpoint = '/api/materia/';

const alumnoUrl = `${apiUrl}${alumnoEndpoint}`;
const alumnoModifyUrl = `${apiUrl}${alumnoModifyEndpoint}`;
const rolsUrl = `${apiUrl}${rolsEndpoint}`;
const carrerasUrl = `${apiUrl}${carrerasEndpoint}`;
const materiasUrl = `${apiUrl}${materiasEndpoint}`;

const AlumnoUrlId = (alumnoId) => `${alumnoUrl}${alumnoId}`;

export const deleteAlumno = createAsyncThunk(
  'alumnos/deleteAlumno',
  async (alumnoId, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.delete(AlumnoUrlId(alumnoId), config);
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

export const getAlumnoById = createAsyncThunk(
  'alumnos/getAlumnoById',
  async (alumnoId, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.get(AlumnoUrlId(alumnoId), config);
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

export const createAlumno = createAsyncThunk(
  'alumnos/createAlumno',
  async (alumnoData, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.post(alumnoUrl, alumnoData, config);
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
export const getAlumnosByCarrera = createAsyncThunk(
  'alumnos/getAlumnosByCarrera',
  async (params, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
      params: params,
    };
    const request = await axios.get(alumnoUrl, config);
    const response = await request.data;

    return response;
  },
);
export const modifyAlumno = createAsyncThunk(
  'alumnos/modifyAlumno',
  async (alumnoData, { getState }) => {
    const state = getState();

    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };

    try {
      const response = await axios.post(alumnoModifyUrl, alumnoData, config);
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

export const getAlumnos = createAsyncThunk(
  'alumnos/getAlumnos',
  async (_, { getState }) => {
    const state = getState();
    const config = {
      headers: {
        Authorization: `token ${state.user.user.token}`,
      },
    };
    const request = await axios.get(alumnoUrl, config);
    const response = await request.data;
    return response;
  },
);

export const getCarreras = createAsyncThunk(
  'alumnos/getCarreras',
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
  'alumnos/getMaterias',
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
export const alumnosSlice = createSlice({
  name: 'alumnos',
  initialState: {
    loading: false,
    alumnos: null,
    alumno: null,
    materias: [],
    carreras: [],
    error: null,
    result: null,
    selectedAlumno: null,
    formData: '',
  },
  reducers: {
    changeFormData: (state, action) => {
      state.formData = action.payload;
    },
    selectedAlumno: (state, action) => {
      state.selectedAlumno = action.payload;
    },
    changeAlumnos: (state, action) => {
      state.alumnos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // view alumnos
      .addCase(getAlumnos.pending, (state) => {
        state.loading = true;
        state.alumnos = null;
        state.error = null;
      })
      .addCase(getAlumnos.fulfilled, (state, action) => {
        state.loading = false;
        state.alumnos = action.payload;
        state.error = null;
      })
      .addCase(getAlumnos.rejected, (state, action) => {
        state.loading = false;
        state.alumnos = null;
        console.log(action.error.message);
        if (action.error.message === 'Request failed with status code 403') {
          state.error = 'Acceso denegado! credenciales incorrectas';
        } else {
          state.error = action.error.message;
        }
      });
    // view alumnos by carrera
    builder.addCase(getAlumnosByCarrera.pending, (state) => {
      state.loading = true;
      state.alumnos = null;
      state.error = null;
    })
    builder.addCase(getAlumnosByCarrera.fulfilled, (state, action) => {
      state.loading = false;
      state.alumnos = action.payload;
      state.error = null;
    })
    builder.addCase(getAlumnosByCarrera.rejected, (state, action) => {
      state.loading = false;
      state.alumnos = null;
      console.log(action.error.message);
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
      console.log(action.error.message);
      if (action.error.message === 'Request failed with status code 403') {
        state.error = 'Acceso denegado! credenciales incorrectas';
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
      console.log(action.error.message);
      if (action.error.message === 'Request failed with status code 403') {
        state.error = 'Acceso denegado! credenciales incorrectas';
      } else {
        state.error = action.error.message;
      }
    });

    // create alumno
    builder.addCase(createAlumno.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.result = null;
    });
    builder.addCase(createAlumno.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      state.alumnos.push(action.payload); // Asumiendo que el servidor devuelve el nuevo usuario
      state.error = null;
      state.result = action.payload.message;
    });

    builder.addCase(createAlumno.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
      state.result = null;
    });

    // delete alumno reducer
    builder.addCase(deleteAlumno.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.result = null;
    });
    builder.addCase(deleteAlumno.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      // Filtrar el usuario eliminado
      state.alumnos = state.alumnos.filter(
        (alumno) => alumno.id !== action.meta.arg,
      );
      state.error = null;
      state.result = action.payload.message;
    });
    builder.addCase(deleteAlumno.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
      state.result = null;
    });

    // modify alumno
    builder.addCase(modifyAlumno.pending, (state) => {
      // Acciones cuando la solicitud está en curso
      state.loading = true;
      state.error = null;
      state.result = null;
    });
    builder.addCase(modifyAlumno.fulfilled, (state, action) => {
      // Acciones cuando la solicitud es exitosa
      state.loading = false;
      state.alumnos.push(action.payload); // Asumiendo que el servidor devuelve el nuevo usuario
      state.error = null;
      state.result = action.payload.message;
    });

    builder.addCase(modifyAlumno.rejected, (state, action) => {
      // Acciones cuando la solicitud falla
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
      state.result = null;
    });
    // view alumnos by id
    builder.addCase(getAlumnoById.pending, (state) => {
      state.loading = true;
      state.alumno = null;
      state.error = null;
    });
    builder.addCase(getAlumnoById.fulfilled, (state, action) => {
      state.loading = false;
      state.alumno = action.payload;
      state.error = null;
    });
    builder.addCase(getAlumnoById.rejected, (state, action) => {
      state.loading = false;
      state.alumno = null;
      console.log(action.error.message);
      if (action.error.message === 'Request failed with status code 403') {
        state.error = 'Acceso denegado! credenciales incorrectas';
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const selectAlumnos = (state) => state.alumnos.alumnos;
export const errorAlumnos = (state) => state.alumnos.error;
export const resultAlumnos = (state) => state.alumnos.result;
export const loadingalumnos = (state) => state.alumnos.loading;
export const getFormData = (state) => state.alumnos.formData;
export const selectCarreras = (state) => state.alumnos.carreras;
export const selectMaterias = (state) => state.alumnos.materias;
export const selectedAlumnoData = (state) => state.alumnos.selectedAlumno;
export const alumnoData = (state) => state.alumnos.alumno;

export const { changeFormData, selectedAlumno, changeAlumnos } = alumnosSlice.actions;
export default alumnosSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '@/features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import usersReducer from '../features/users/usersSlice';
import alumnosReducer from '@/features/alumnos/alumnosSlice';
import apiSlice from './api/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: counterReducer,
    user: userReducer,
    users: usersReducer,
    alumnos: alumnosReducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

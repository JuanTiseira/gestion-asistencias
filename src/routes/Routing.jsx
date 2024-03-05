import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import Dashboard from '@/pages/Dashboard/Dashboard';
import ProtectedRoute from '@/components/utils/ProtectedRoute';
import Admin from '@/pages/Admin/Admin';
import AgregarUsuario from '@/pages/Admin/agregarUsuario/AgregarUsuario';
import ModificarUsuario from '@/pages/Admin/modificarUsuario/ModificarUsuario';
import Alumnos from '@/pages/Alumnos/Alumnos';
import ModificarAlumno from '@/pages/Alumnos/modificarAlumno/ModificarAlumno';
import AgregarAlumno from '@/pages/Alumnos/AgregarAlumno/AgregarAlumno';
import Asistencias from '@/pages/Asistencias/Asistencias';
import AgregarAsistencia from '@/pages/Asistencias/AgregarAsistencias/AgregarAsistencias';
import AsistenciaDetail from '@/components/Forms/Asistencias/AsistenciaDetail/AsistenciaDetail';

function Routing() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/asistencias" element={<Asistencias />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/asistencias/detalle-asistencia/:asistenciaId"
          element={<AsistenciaDetail />}
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/asistencias/agregar-asistencia" element={<AgregarAsistencia />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/administracion" element={<Admin />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/administracion/agregar-usuario"
          element={<AgregarUsuario />}
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/administracion/editar-usuario/:userId"
          element={<ModificarUsuario />}
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/alumnos" element={<Alumnos />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/alumnos/agregar-alumno" element={<AgregarAlumno />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/alumnos/editar-alumno/:alumnoId"
          element={<ModificarAlumno />}
        />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Routing;

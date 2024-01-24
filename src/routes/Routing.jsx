import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import Dashboard from '@/pages/Dashboard/Dashboard';
import ProtectedRoute from '@/components/utils/ProtectedRoute';
import Admin from '@/pages/Admin/Admin';
function Routing() {

 

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />} />
      <Route element={<ProtectedRoute/>}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route path="/asistencias" element={<Dashboard />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route path="/administracion" element={<Admin />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route path="/alumnos" element={<Dashboard />} />
      </Route>
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Routing;
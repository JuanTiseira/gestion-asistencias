import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import Dashboard from '@/pages/Dashboard/Dashboard';

function Routing() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/asistencias" element={<Dashboard />} />
      <Route path="/administracion" element={<Dashboard />} />
      <Route path="/alumnos" element={<Dashboard />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/register/*" element={<Register />} />
    </Routes>
  );
}

export default Routing;
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Order from './pages/Order';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="pedidos" element={<Orders />} />
        <Route path="pedidos/:orderId" element={<Order />} />
        <Route path="error" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
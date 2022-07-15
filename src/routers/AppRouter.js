// Dependencies
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// Components
import { Home } from '../components/pages/Home/Home'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/files/data" element={<Home />} />
        <Route path="*" element={<Navigate to="/files/data" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

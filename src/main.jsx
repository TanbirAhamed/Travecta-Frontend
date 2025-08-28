import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Routers from './route/Routers';
import AuthProvider from './provider/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Routers />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

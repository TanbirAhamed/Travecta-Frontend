import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Routers from './route/Routers';
import AuthProvider from './provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Routers />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)

import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DisplayBooks from './books/DisplayBooks';
import MainMenu from './menu/MainMenu';
import ApiProvider from './api/ApiProvider';
import DisplayRentals from './rentals/DisplayRentals';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/books" element={<DisplayBooks />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/rentals" element={<DisplayRentals />} />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;

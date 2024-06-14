import React from 'react';
import './App.css';
import LoginForm from './both/login-form/LoginForm';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BooksAdmin from './admin/admin-books/BooksAdmin';
import MenuAdmin from './admin/admin-menu/MenuAdmin';
import ApiProvider from './api/ApiProvider';
import RentalsAdmin from './admin/admin-rentals/RentalsAdmin';
import MenuReader from './reader/reader-menu/MenuReader';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import BooksReader from './reader/reader-books/BooksReader';
import RentalsReader from './reader/reader-rentals/RentalsReader';
import UsersAdmin from './admin/admin-users/UsersAdmin';
import ReviewsReader from './reader/reader-reviews/ReviewsReader';
import ReviewsAdmin from './admin/admin-reviews/ReviewsAdmin';

function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/books_admin" element={<BooksAdmin />} />
            <Route path="/books" element={<BooksReader />} />
            <Route path="/menu_admin" element={<MenuAdmin />} />
            <Route path="/menu" element={<MenuReader />} />
            <Route path="/rentals_admin" element={<RentalsAdmin />} />
            <Route path="/rentals" element={<RentalsReader />} />
            <Route path="/users" element={<UsersAdmin />} />
            <Route path="/reviews_admin" element={<ReviewsAdmin />} />
            <Route path="/reviews" element={<ReviewsReader />} />
          </Routes>
        </ApiProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;

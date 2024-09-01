import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';

const AdminRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            element={
                token ? <Component /> : <Navigate to="/login" />
            }
        />
    );
};

const AppRoutes = () => (
    <Router>
        <Routes>
            <Navbar />
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/book/:isbn" element={<BookDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminRoute component={Admin} />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    </Router>
);

export default AppRoutes;

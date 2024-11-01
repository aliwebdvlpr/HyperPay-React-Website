import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';
import HomePage from './HomePage.js';
import PaymentForm from './PaymentForm.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment" element={<PaymentForm />} />
            </Routes>
        </Router>
    );
};

export default App;
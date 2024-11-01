import React from 'react';
import axios from 'axios';

const CheckoutButton = () => {
    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/checkout'); // Specify the backend URL
            console.log('Checkout response:', response.data);
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    return (
        <button onClick={handleCheckout}>
            Checkout
        </button>
    );
};

export default CheckoutButton;

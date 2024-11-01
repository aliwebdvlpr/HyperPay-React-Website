import React from 'react';
import CheckoutButton from './CheckoutButton';

const CheckoutPage = () => {
    return (
        <div>
            <h1>Checkout</h1>
            <p>Please confirm your order details before proceeding:</p>
            {/* Add your order details here, e.g., items, total price */}
            <CheckoutButton />
        </div>
    );
};

export default CheckoutPage;

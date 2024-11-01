import React, { useState } from 'react';
import axios from 'axios';
import PaymentForm from './PaymentForm'; // Adjust the path as needed

const CheckoutButton = () => {
    const [checkoutData, setCheckoutData] = useState(null); // State to hold checkout response

    const handleCheckout = async () => {
        try {
            const response = await axios.post('https://hyper-pay-react-website-6p7m1s1sr-software-2020s-projects.vercel.app:3000/api/checkout'); 
            console.log('Checkout response:', response.data);
            setCheckoutData(response.data); // Update state with response data
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleCheckout}>
                Checkout
            </button>
            {/* Conditionally render PaymentForm if checkoutData is available */}
            {checkoutData && (
                <PaymentForm 
                    checkoutId={checkoutData.id} 
                    integrity={checkoutData.integrity} 
                    shopperResultUrl="/" // Adjust as necessary
                />
            )}
        </div>
    );
};

export default CheckoutButton;

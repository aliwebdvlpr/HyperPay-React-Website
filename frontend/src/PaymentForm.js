import React, { useEffect } from 'react';
import CheckoutButton from './CheckoutButton'; // Adjust the path as needed

const PaymentForm = ({ checkoutId, integrity, shopperResultUrl }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
        script.integrity = integrity;
        script.crossOrigin = 'anonymous';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [checkoutId, integrity]);

    return (
        <form action={shopperResultUrl} className="paymentWidgets" data-brands="VISA MASTER AMEX">
            {/* Additional form elements can be added here if needed */}
            <CheckoutButton />
        </form>
    );
};

export default PaymentForm;

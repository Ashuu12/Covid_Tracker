import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { resetProduct } from "../../../redux/cartRedux"
import { useDispatch, useSelector } from 'react-redux'
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
    PaymentElement
} from '@stripe/react-stripe-js';
import { makeStyles } from '@material-ui/core';
import cx from 'classnames'
import { userRequest } from '../../../api/requestMethods';
import { REACT_APP_STRIPE_KEY } from '../../../config'
import { useNavigate } from 'react-router-dom'


const useStyles = makeStyles({
    container: { height: "85vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
    form: { width: '30vw', padding: "20px", border: "1px solid teal", display: "flex", flexDirection: "column", gap: "20px" },
    input: { width: '90%', padding: "10px", border: "none", borderBottom: "1px solid teal", marginRight: "20px" },
    add2: { display: "flex", flexDirection: "row", gap: "10px" },
    btn: {
        padding: "10px 0", fontSize: "18px", fontWeight: "100", color: "teal", backgroundColor: "white", border: "none", transition: "all 0.2s ease",
        '&:hover': { backgroundColor: "teal", color: "white", border: "none" }
    },
    title: { textAlign: "center" }
})

const CheckoutForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const [address, setAddress] = useState({})

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: elements.getElement(CardElement),
        // });
        try {
            let res = await userRequest.post("/checkout/create-payment-intent")
            console.log(res.data.clientSecret);
            (async () => {
                const { paymentIntent, error } = await stripe.confirmCardPayment(res.data.clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    }
                });
                if (error) {
                    console.log(error);
                }
            })()
            res = await userRequest.post("/checkout/success", {
                amount: res.data.amount,
                address: address
            })
            console.log(res.data)

            dispatch(resetProduct())
            setTimeout(() => navigate("/success"), 3000)

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <h1 className={classes.title}>COVID TRACKER CHECKOUT</h1>
                <input className={cx(classes.name, classes.input)} placeholder="Name" onChange={(e) => setAddress(prev => ({ ...prev, name: e.target.value }))} />
                <input className={cx(classes.address, classes.input)} placeholder="Address" onChange={(e) => setAddress(prev => ({ ...prev, address: e.target.value }))} />
                <div className={classes.add2}>
                    <input className={cx(classes.zipcode, classes.input)} placeholder="Zip Code" onChange={(e) => setAddress(prev => ({ ...prev, zipcode: e.target.value }))} />
                    <input className={cx(classes.city, classes.input)} placeholder="City" onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))} />
                </div>
                <CardElement />
                <button type="submit" disabled={!stripe || !elements} className={classes.btn}>
                    Pay
                </button>
            </form>
        </div>
    );
};

const stripePromise = loadStripe(REACT_APP_STRIPE_KEY);

const Payment = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default Payment;
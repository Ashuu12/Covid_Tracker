import { makeStyles } from "@material-ui/core"
import cx from 'classnames'
import { AddOutlined, RemoveOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { useState, useEffect } from 'react'
import { REACT_APP_STRIPE_KEY } from '../../../config'
import { userRequest } from "../../../api/requestMethods"
import { useNavigate, Link } from 'react-router-dom'

const useStyles = makeStyles({
    container: { padding: "20px" },
    title: { fontWeight: "300", textAlign: "center" },
    top: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" },
    topButton: { padding: "10px", fontWeight: "600", cursor: "pointer" },
    topTexts: {},
    topText: { textDecoration: "underline", cursor: "pointer", margin: "0 20px" },
    filled: { border: "none", backgroundColor: "black", color: "white" },
    bottom: { display: "flex", justifyContent: "space-between" },
    info: { flex: 3 },
    product: { display: "flex", justifyContent: "space-between" },
    productDetail: { flex: 2, display: "flex" },
    img: { width: "250px" },
    details: { padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around" },
    productName: {},
    productId: {},
    productColor: { width: "20px", height: "20px", borderRadius: "50%", marginLeft: "10px" },
    productSize: {},
    priceDetail: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" },
    productAmountContainer: { display: "flex", alignItems: "center" },
    productAmount: { fontSize: "24px", margin: "5px" },
    productPrice: { fontSize: "30px", fontWeight: "200", paddingTop: "10px" },
    hr: { backgroundColor: "#bbb", border: "none", height: "2px" },
    summary: { flex: 1, border: "2px solid lightgray", height: "50vh", padding: "20px", borderRadius: "10px" },
    summaryTitle: { fontWeight: 200 },
    summaryItem: { margin: "30px 0px", display: "flex", justifyContent: "space-between" },
    summaryItemText: {},
    summaryItemPrice: {},
    btn: { width: "100%", border: "none", backgroundColor: "teal", color: "white", fontSize: "20px", cursor: "pointer", padding: "15px 20px", borderRadius: "4px", fontWeight: "600" },
})

const Cart = () => {
    const classes = useStyles()
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            console.log("something")
        })()
    }, [])


    const makeCart = async () => {
        await userRequest.post("/cart/");
        (async () => {
            try {

                const req = cart.products.map(product => ({
                    productId: product._id, quantity: product.quantity
                }))
                console.log(req)
                const res = await userRequest.put("/cart/", req)
                console.log("cart res", res)
                navigate("/payment")
            } catch (error) {
                console.log(error)
            }
        })()

    }

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>
                YOUR BAG
            </h1>
            <div className={classes.top}>
                <button className={classes.topButton}>CONTINUE SHOPPING</button>
                <div className={classes.topTexts}>
                    <span className={classes.topText}>Shopping Bag(2)</span>
                    <span className={classes.topText}>Your Wishlist(0)</span>
                </div>
                <button className={cx(classes.topButton, classes.filled)}>CHECKOUT NOW</button>
            </div>
            <div className={classes.bottom}>
                <div className={classes.info}>
                    {cart.products.map(product => (
                        <>
                            <div className={classes.product}>
                                <div className={classes.productDetail}>
                                    <img src={product.img} className
                                        ={classes.img} />
                                    <div className={classes.details}>
                                        <div className={classes.productName}>
                                            <b>Product: </b> {product.title}
                                        </div>
                                        <div className={classes.productId}>
                                            <b>ID: </b> {product._id}
                                        </div>
                                        {product.color !== "none" &&
                                            <div style={{ display: 'flex' }}>
                                                <b>Color: </b><div className={classes.productColor} style={{ backgroundColor: product.color }}></div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={classes.priceDetail}>
                                    <div className={classes.productAmountContainer}>
                                        <RemoveOutlined />
                                        <div className={classes.productAmount}>{product.quantity}</div>
                                        <AddOutlined />
                                    </div>
                                    <span className={classes.price}>&#x20B9; {product.price * product.quantity}</span>
                                    <div className={classes.productPrice}></div>
                                </div>
                            </div>
                            <hr className={classes.hr} />
                        </>
                    ))}
                </div>
                <div className={classes.summary}>
                    <div className={classes.summaryTitle}>ORDER SUMMARY</div>
                    <div className={classes.summaryItem}>
                        <div className={classes.summaryItemText}>Subtotal</div>
                        <div className={classes.summaryItemPrice}>&#x20B9; {cart.total.toFixed(2)}</div>
                    </div>
                    <div className={classes.summaryItem}>
                        <div className={classes.summaryItemText}>Estimated Shipping</div>
                        <div className={classes.summaryItemPrice}>&#x20B9; 40.00</div>
                    </div>
                    <div className={classes.summaryItem}>
                        <div className={classes.summaryItemText}>Shipping Discount</div>
                        <div className={classes.summaryItemPrice}>&#x20B9; {cart.total >= 500 ? -40.00 : 0}</div>
                    </div>
                    <div className={classes.summaryItem} style={{ fontWeight: "700", fontSize: "24px" }}>
                        <div className={classes.summaryItemText} >Total</div>
                        <div className={classes.summaryItemPrice}>&#x20B9; {cart.total >= 500 ? cart.total.toFixed(2) : (cart.total + 40).toFixed(2)}</div>
                    </div>

                    <button className={classes.btn} onClick={makeCart}>CHECKOUT NOW</button>

                </div>
            </div>
        </div>
    )
}

export default Cart;
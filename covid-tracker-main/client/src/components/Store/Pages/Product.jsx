import { makeStyles } from "@material-ui/core"
import cx from 'classnames'
import { AddOutlined, RemoveOutlined } from '@material-ui/icons'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { publicRequest } from "../../../api/requestMethods"
import { addProduct } from "../../../redux/cartRedux"
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles({
    container: { padding: "50px", display: "flex" },
    imgContainer: { flex: 1 },
    img: { width: "100%", height: "75vh", objectFit: "cover" },
    infoContainer: { flex: 1, padding: "0px 50px" },
    title: { fontWeight: "200" },
    description: { margin: "20px 0px", textAlign: "justify" },
    price: { fontWeight: "100", fontSize: "40px", color: "black" },
    filterContainer: { width: "50%", display: "flex", justifyContent: "space-between", margin: "30px 0px" },
    filter: { display: "flex", alignItems: "center", justifyContent: "center" },
    filterTitle: { fontWeight: "200", fontSize: "20px", paddingRight: "10px" },
    colorOption: { width: "20px", height: "20px", borderRadius: "50%", margin: "0px 10px", cursor: "pointer", border: "1px solid black" },
    addContainer: { width: "50%", display: "flex", justifyContent: "space-between", margin: "30px 0px" },
    amountContainer: { display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" },
    amount: { width: "30px", height: "30px", borderRadius: "10px", border: "1px solid teal", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 10px" },
    btn: {
        padding: "15px", border: "2px solid teal", backgroundColor: "white", cursor: "pointer", fontWeight: "600", transition: "all 0.2s ease", color: "teal",
        '&:hover': { backgroundColor: "teal", color: "white" }
    }
})

const Product = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const classes = useStyles()
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    console.log("Product", product)
    const [color, setColor] = useState("")
    const productId = useLocation().pathname.split("/")[2]
    console.log(color)

    useEffect(() => {
        (async () => {
            try {
                const res = await publicRequest.get(`/product/find/${productId}`)
                setProduct(res.data)
                const colors = res.data.colors
                if (colors.length > 1) {
                    setColor(res.data.colors[0] === "none" ? res.data.colors[1] : res.data.colors[0])
                } else setColor("none")

            } catch (error) {
                console.log(error)
            }
        })()
    }, [productId])

    const addToCart = async () => {
        dispatch(addProduct({ ...product, quantity, color }))
    }

    return (
        <div className={classes.container}>
            <div className={classes.imgContainer}>
                <img src={product.img} alt="product" className={classes.img} />
            </div>
            <div className={classes.infoContainer}>
                <h1 className={classes.title}>{product.title}</h1>
                <p className={classes.description}>{product.desc}</p>
                <span className={classes.price}>&#x20B9; {product.price}</span>
                <div className={classes.filterContainer}>
                    {product.colors?.length > 1 &&
                        <div className={classes.filter}>
                            <div className={classes.filterTitle}>Color: </div>
                            {product.colors.map(color => color !== "none" && <div className={classes.colorOption} style={{ background: color }} key={color} onClick={() => setColor(color)}></div>)}
                        </div>
                    }
                    {/* <div className={classes.filter}>
                        <div className={classes.filterTitle}>Size: </div>
                        <select>
                            <option className={classes.filterSizeOption}>XS</option>
                            <option className={classes.filterSizeOption}>S</option>
                            <option className={classes.filterSizeOption}>M</option>
                            <option className={classes.filterSizeOption}>L</option>
                            <option className={classes.filterSizeOption}>XL</option>
                        </select>
                    </div> */}
                </div>
                <div className={classes.addContainer}>
                    <div className={classes.amountContainer}>
                        <div className={classes.remove} onClick={() => { setQuantity(prev => prev < 2 ? 1 : prev - 1) }}><RemoveOutlined /></div>
                        <div className={classes.amount}>{quantity}</div>
                        <div className={classes.add} onClick={() => { setQuantity(prev => prev + 1) }}><AddOutlined /></div>
                    </div>
                    <button className={classes.btn} onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product
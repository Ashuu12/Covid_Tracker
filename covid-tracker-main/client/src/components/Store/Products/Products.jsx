import { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core"
import axios from "axios"
import { popularProducts } from '../data'
import Product from './Product'

const useStyles = makeStyles({
    container: { padding: "20px", display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "space-between" }
})

const Products = ({ cat, filters, sort }) => {
    const classes = useStyles()

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(cat ? `http://localhost:5000/api/product/?category=${cat}` : `http://localhost:5000/api/product/`)
                setProducts(res.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [cat])

    useEffect(() => {
        cat && setFilteredProducts(
            products.filter(item => Object.entries(filters).every(([key, value]) => item[key]?.includes(value)))
        )
    }, [products, cat, filters])

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            )
        } else if (sort === "asc") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => a.price - b.price)
            )
        } else {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => b.price - a.price)
            )
        }
    }, [sort])

    return (
        <div className={classes.container}>
            {filteredProducts.map(item => (
                <Product item={item} key={item.id} />
            ))}
        </div>
    )
}

export default Products
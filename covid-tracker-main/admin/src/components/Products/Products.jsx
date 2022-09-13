import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core';
import { List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import { adminRequest } from "../../api/requestMethods";

const useStyles = makeStyles({
    input: { width: "40%", height: "25px" }
})

const Products = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({});
    const [id, setId] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await adminRequest("/product/")
            console.log(data)
            setProducts(data);
        })()
    }, [])

    const onAddProduct = async () => {
        try {
            const { data } = await adminRequest.post("/product/", newProduct)
            console.log(data)
            setProducts([data, ...products]);
            console.log("Success")
        } catch (error) {
            console.log(error)
        }
    }
    const onModifyProduct = async () => {
        try {
            const { data } = await adminRequest.put(`/product/${id}`, newProduct)
            console.log(data)
            setProducts([data, ...products.filter(product => product._id !== id)]);
            console.log("Success")
        } catch (error) {
            console.log(error)
        }
    }
    const onDeleteProduct = async (id) => {
        try {
            const { data } = await adminRequest.delete(`/product/${id}`, newProduct)
            console.log(data)
            setProducts([...products.filter(product => product._id !== id)]);
            console.log("Success")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ul style={{ listStyle: "none" }}>
            <li>
                <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                    <li className={classes.input}>
                        <input placeholder="Product Id(modify only)" onChange={(e) => setId(e.target.value)} style={{ height: "100%", width: "100%" }} />
                    </li>
                    <li className={classes.input}>
                        <input placeholder="Product Title" onChange={(e) => setNewProduct(item => ({ ...item, title: e.target.value }))} style={{ height: "100%", width: "100%" }} />
                    </li>
                    <li className={classes.input}>
                        <input placeholder="Product Description" onChange={(e) => setNewProduct(item => ({ ...item, desc: e.target.value }))} style={{ height: "100%", width: "100%" }} />
                    </li>
                    <li className={classes.input}>
                        <input placeholder="Product Image" onChange={(e) => setNewProduct(item => ({ ...item, img: e.target.value }))} style={{ height: "100%", width: "100%" }} />
                    </li>
                    <li className={classes.input}>
                        <input placeholder="Product Categories" onChange={(e) => setNewProduct(item => ({ ...item, categories: e.target.value.split(" ") }))} style={{ height: "100%", width: "100%" }} />
                    </li>
                    <li className={classes.input}>
                        <input placeholder="Product Colors" onChange={(e) => setNewProduct(item => ({ ...item, colors: e.target.value.split(" ") }))} style={{ height: "100%", width: "100%" }} />
                    </li>
                    <li className={classes.input}>
                        <input placeholder="Product Price" onChange={(e) => setNewProduct(item => ({ ...item, price: e.target.value }))} style={{ height: "100%", width: "100%" }} />
                    </li>
                    <li className={classes.input}>
                        {id === "" ?
                            <div style={{ fontSize: "20px", fontWeight: "100", border: "1px solid teal", backgroundColor: "white", height: "29px", width: "101%", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={onAddProduct}>Add Product</div> :
                            <div style={{ fontSize: "20px", fontWeight: "100", border: "1px solid teal", backgroundColor: "white", height: "29px", width: "101%", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={onModifyProduct}>Modify Product</div>
                        }
                    </li>
                </ul>
                <hr></hr>
            </li>
            {products.map((product, index) => (
                <>
                    <li key={product._id} style={{ display: "flex", }}>
                        <img src={product.img} style={{ width: "30vh", objectFit: "cover" }} />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <h1>{product.title}</h1>
                            <p>{product.desc}</p>
                            <p>{product._id}</p>
                            {product.colors?.length > 1 &&
                                <p style={{ display: "flex", gap: "20px" }}><b>Colors: </b>
                                    {product.colors.map((color, index) => (color !== "none" &&
                                        <div style={{
                                            width: "20px", height: "20px", borderRadius: "50%", backgroundColor: color,
                                        }} key={index}></div>
                                    ))}
                                </p>
                            }
                            <button onClick={() => onDeleteProduct(product._id)} style={{ width: "100px" }}>Delete Product</button>
                        </div>
                    </li>
                    <hr></hr>
                </>
            )
            )}
        </ul>
    )
}

export default Products

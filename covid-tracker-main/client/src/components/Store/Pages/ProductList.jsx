import { makeStyles } from "@material-ui/core"
import { useLocation } from "react-router-dom"
import Products from "../Products/Products"
import { useState } from 'react'

const useStyles = makeStyles({
    filterContainer: { display: 'flex', justifyContent: 'space-between' },
    title: {
        margin: "20px",
        '&::first-letter': {
            textTransform: 'capitalize'
        }
    },
    filter: { margin: "20px", display: "flex", alignItems: "center" },
    filterText: { fontSize: "20px", fontWeight: "600", marginRight: "20px" },
    select: { padding: "7px", marginRight: "20px" },
})

const ProductList = () => {
    const classes = useStyles()

    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState('newest')
    const cat = useLocation().pathname.split("/")[2]

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value
        })
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>{cat.endsWith("s") ? cat : `${cat}s`}</h1>
            <div className={classes.filterContainer}>
                <div className={classes.filter}>
                    <div className={classes.filterText}>Filter Products:</div>
                    <select className={classes.select} name="colors" onChange={handleFilters}>
                        <option selected value="none">Color</option>
                        <option>Red</option>
                        <option>Blue</option>
                        <option>Green</option>
                        <option>Yellow</option>
                        <option>Black</option>
                        <option>White</option>
                    </select>
                    {/* <select className={classes.select} name="size" onChange={handleFilters}>
                        <option disabled selected>Size</option>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select> */}
                </div>
                <div className={classes.filter}>
                    <div className={classes.filterText}>Sort Products:</div>
                    <select className={classes.select} onChange={(e) => setSort(e.target.value)}>
                        <option selected value="newest">Newest</option>
                        <option value="asc">Price (asc)</option>
                        <option value="desc">Price (desc)</option>
                    </select>
                </div>
            </div>
            <Products cat={cat} filters={filters} sort={sort} />
        </div>
    )
}

export default ProductList;
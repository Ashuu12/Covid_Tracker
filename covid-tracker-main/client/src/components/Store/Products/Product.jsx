import { makeStyles } from "@material-ui/core"
import { ShoppingCartOutlined, SearchOutlined, FavoriteBorderOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    container: { flex: 1, minWidth: "280px", height: "350px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5fbfd", position: "relative" },
    circle: { width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "white", position: "absolute" },
    img: { height: "75%", zIndex: 2 },
    info: {
        opacity: 0, width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 3, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease-in-out",
        '&:hover': { opacity: 1 }
    },
    icon: {
        width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px", cursor: "pointer", transition: "all 0.2s ease",
        '&:hover': { backgroundColor: "teal", transform: "scale(1.2)" }
    },
})

const Product = ({ item }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.circle}>
            </div>
            <img className={classes.img} src={item.img} alt="Product Image" />
            <div className={classes.info}>
                <div className={classes.icon}>
                    <ShoppingCartOutlined />
                </div>
                <Link to={`/product/${item._id}`}>
                    <div className={classes.icon}>
                        <SearchOutlined />
                    </div>
                </Link>
                <div className={classes.icon}>
                    <FavoriteBorderOutlined />
                </div>
            </div>
        </div>
    )
}

export default Product
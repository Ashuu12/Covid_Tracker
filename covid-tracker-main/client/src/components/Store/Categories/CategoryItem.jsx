import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    container: { flex: 1, height: "60vh", position: "relative" },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    info: { position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'column' },
    title: { color: 'white', fontSize: '30px', fontWeight: '700' },
    btn: { border: "none", padding: "10px 20px", backgroundColor: "teal", color: "white", fontSize: "20px", borderRadius: "10px", cursor: "pointer" }
})

const CategoryItem = ({ item }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Link to={`/products/${item.cat}`}>
                <img src={item.img} alt={item.title} className={classes.img} />
                <div className={classes.info}>
                    <h2 className={classes.title}>{item.title}</h2>
                    <button className={classes.btn}>Shop Now</button>
                </div>
            </Link>
        </div>
    )
}

export default CategoryItem;
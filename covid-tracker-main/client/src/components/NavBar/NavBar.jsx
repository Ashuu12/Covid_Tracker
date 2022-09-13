import { Toolbar, Divider, Typography, Button, makeStyles, Badge } from '@material-ui/core'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { ShoppingCart, Search } from '@material-ui/icons'
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const useStyles = makeStyles((theme) => ({
    navBar: { minHeight: "60px" },
    title: { width: "100%", color: 'black', display: 'flex', gap: '50px', justifyContent: 'space-between', alignItems: 'center' },
    auth: { felx: 3, display: 'grid', gridGap: '15px', alignItems: 'center' },
    signup: { gridColumn: 1 },
    login: { gridColumn: 2 },
    link: { textDecoration: 'none', },
    nav: { display: 'flex', justifyContent: 'left', gap: "25px" },
    text: { color: 'black' },
    logo: { fontWeight: '700', color: 'black', fontSize: "200%" },
    cart: { gridColumn: 3, color: "black" },
    searchContainer: { flex: 2, border: "1px solid lightgray", display: 'flex', alignItems: 'center', marginRight: "7rem", borderRadius: "1rem", height: "2rem" }
}))

const NavBar = ({ user }) => {
    const quantity = useSelector(state => state.cart.quantity)
    const location = useLocation();
    const classes = useStyles();
    console.log("bello", user);
    return (
        <>
            <Toolbar className={classes.navBar}>
                <div className={classes.title}>
                    <div className={classes.nav}>
                        <Link to="/article" className={classes.link}>
                            <Typography variant="h6" className={classes.text}>Article</Typography>
                        </Link>
                        <Link to="/write" className={classes.link}>
                            <Typography variant="h6" className={classes.text}>Write</Typography>
                        </Link>
                        <Link to="/store" className={classes.link}>
                            <Typography variant="h6" className={classes.text}>Store</Typography>
                        </Link>
                    </div>
                    <Link to="/" className={classes.link}>
                        <Typography variant="h5" className={classes.logo}>COVID TRACKER.</Typography>
                    </Link>
                    <div className={classes.auth}>
                        {user === undefined || user.error !== undefined ?
                            (<>
                                <Link to="/signup" className={cx(classes.link, classes.signup, classes.text)}>
                                    <Button variant="outlined">Sign Up</Button>
                                </Link>
                                <Link to="/login" className={cx(classes.link, classes.login, classes.text)}>
                                    <Button variant="outlined">Log In</Button>
                                </Link>
                            </>) :
                            (<>
                                <Typography variant="body2">Hi {user.name}!</Typography>
                                <Link to="/profile" className={cx(classes.link, classes.login)}>
                                    <img src={user.profile} height='30px' />
                                </Link>
                            </>)
                        }
                        <Link to="/cart" className={classes.cart}>
                            <Badge badgeContent={quantity} color="primary" >
                                <ShoppingCart />
                            </Badge>
                        </Link>
                    </div>
                </div>
            </Toolbar>
            <Divider ></Divider>
        </>

    )
}

export default NavBar;
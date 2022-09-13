import { Toolbar, Divider, Typography, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import cx from 'classnames'

const useStyles = makeStyles((theme) => ({
    title: { flex: 1, color: 'black' },
    auth: { display: 'grid', gridGap: '10px' },
    signup: { gridColumn: 1 },
    login: { gridColumn: 2 },
    link: { textDecoration: 'none' },
    sub: { display: 'flex', marginLeft: "200px", gap: "20px" }
}))

const NavBar = () => {
    const classes = useStyles();

    return (
        <>
            <Toolbar>
                <Link to="/" className={cx(classes.title, classes.link)}>
                    <Typography variant="h6">COVID TRACKER ADMIN</Typography>
                </Link>
                {/* <div className={classes.auth}>
                    <Link to="/signup" className={cx(classes.link,classes.signup)}>
                        <Button variant="outlined">Sign Up</Button>
                    </Link>
                    <Link to="/login" className={cx(classes.link,classes.login)}>
                        <Button variant="outlined">Log In</Button>
                    </Link>
                </div>    */}
                <div className={classes.sub}>
                    <Link to="/home" className={cx(classes.title, classes.link)}>
                        <Typography variant="button">HOME</Typography>
                    </Link>
                    <Link to="/products" className={cx(classes.link)}>
                        <Typography variant="button">PRODUCT</Typography>
                    </Link>
                </div>
            </Toolbar>
            <Divider ></Divider>
        </>

    )
}

export default NavBar;
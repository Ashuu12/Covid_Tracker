import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Pending } from './../../components'

import { makeStyles, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';

import { fetchPendingUsers } from '../../api/admin';

const useStyles = makeStyles({

})

const Home = () => {
    const classes = useStyles();

    const [admin, setAdmin] = useState({ adminId: "", password: "" });
    const [cookies, setCookie, removeCookie] = useCookies(['access-token']);
    const [open, setOpen] = useState(false);
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        console.log(cookies["access-token"]);
        (async () => {
            const data = await fetchPendingUsers();
            setPendingUsers(data);
        })();
    }, [])

    const clickHandler = async () => {
        setOpen(!open);
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Pending Requests
                </ListSubheader>
            }
        >
            {pendingUsers.map((user, index) => {
                return (
                    <Pending user={user} setPendingUsers={setPendingUsers} />
                )
            })}
        </List>
    )
}

export default Home

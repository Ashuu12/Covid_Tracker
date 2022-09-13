
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { makeStyles, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Collapse, ButtonGroup, Button } from '@material-ui/core';
import { useState } from 'react';
import { fetchUser, acceptRequest, rejectRequest } from '../../api/admin';

const useStyles = makeStyles((theme) => ({
}))

const Pending = ({ user, setPendingUsers }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [userProfile, setUserProfile] = useState();

    const handleClick = () => {
        setOpen(!open);
        (async () => {
            const data = await fetchUser(user._id);
            setUserProfile(data);
        })();
    }
    const onAccept = () => {
        (async () => {
            const data = await acceptRequest(user._id);
            if (data.error !== undefined) {
                alert(data.error);
            } else {
                alert("User requested has been accepted");
                setOpen(!open);
                setPendingUsers((pendingUsers) => pendingUsers.filter((pendingUser) => pendingUser._id !== user._id))
            }
        })();
    }
    const onReject = () => {
        (async () => {
            const data = await rejectRequest(user._id);
            if (data.error !== undefined) {
                alert(data.error);
            } else {
                alert("User requested has been rejected");
                setOpen(!open);
                setPendingUsers((pendingUsers) => pendingUsers.filter((pendingUser) => pendingUser._id !== user._id))
            }
        })();
    }

    return (
        <>
            <ListItem button key={user._id} onClick={handleClick}>
                <ListItemIcon>
                    <img height='25px' src={user.profile} alt="profile_pic" />
                </ListItemIcon>
                <ListItemText primary={user.name} />
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <div>Email:</div>
                        </ListItemIcon>
                        <ListItemText >
                            {userProfile && (<div>{userProfile.email}</div>)}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={onAccept}>Accept</Button>
                            <Button onClick={onReject}>Reject</Button>
                        </ButtonGroup>
                    </ListItem>
                </List>
            </Collapse>
        </>

    )
}

export default Pending;
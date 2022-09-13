import { makeStyles, Divider, List, ListItem, ListItemText, ListSubheader, FormControl, InputLabel, OutlinedInput, Button, TextareaAutosize } from '@material-ui/core'
import { useState, useEffect } from 'react';
import { saveArticle } from '../../api/article'


const useStyles = makeStyles((theme) => ({
    container: { display: "flex", minHeight: "90vh" },
    add: { width: "30vh" },
    submit: { position: 'absolute', bottom: 50, right: 50, backgroundColor: "orange" },
    article: { display: "flex", flexDirection: "column", gap: "10px", width: "140vh" },
    editArea: { padding: "20px" },
    para: { minHeight: "30px" },
    box: { display: "flex", justifyContent: "center", alignItems: "center", height: "85vh", width: "75vw", fontSize: "40px", color: "grey" },
}))

let paragraphCount = 0;
let imageCount = 0;

const Write = () => {
    const classes = useStyles();

    const [article, setArticle] = useState({})
    const [itemList, setItemList] = useState([])

    const onTitle = async () => {
        setItemList([...itemList, 't0'])
    }

    const onParagraph = async () => {
        setItemList([...itemList, `p${paragraphCount++}`])
    }

    const onImage = async () => {
        setItemList([...itemList, `i${imageCount++}`])
    }

    const clickHandler = async () => {
        const data = await saveArticle({ itemList, article })
        console.log("saveArticle response", data)
    }

    return (
        <div className={classes.container}>
            <div className={classes.add}>
                <List component="div" disablePadding
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Add Article component
                        </ListSubheader>
                    }>
                    <ListItem sx={{ pl: 4 }} button onClick={onTitle}>
                        <ListItemText >
                            Title
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }} button onClick={onParagraph}>
                        <ListItemText >
                            Paragraph
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }} button onClick={onImage}>
                        <ListItemText >
                            Image
                        </ListItemText>
                    </ListItem>
                </List>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.editArea}>
                {itemList.length === 0 ?
                    <div className={classes.box}>
                        <div>Choose a component to add</div>
                    </div> :
                    <div className={classes.article} >
                        {itemList.map((item, index) => {
                            if (item === 't0') {
                                return (
                                    <FormControl variant="outlined" >
                                        <InputLabel>Title</InputLabel>
                                        <OutlinedInput type="text" label="Title" className={classes.input_style} onChange={(e) => { setArticle({ ...article, [item]: e.target.value }) }} />
                                    </FormControl>
                                )
                            }
                            const pRegex = /^p/i;
                            if (pRegex.test(item)) {
                                return (
                                    <FormControl variant="outlined" >
                                        <label>Paragraph {item}</label>
                                        <TextareaAutosize type="text" className={classes.para} onChange={(e) => { setArticle({ ...article, [item]: e.target.value }) }} />
                                    </FormControl>
                                )
                            }
                            const iRegex = /^i/i;
                            if (iRegex.test(item)) {
                                return (
                                    <FormControl variant="outlined" >
                                        <InputLabel>Image Link {item}</InputLabel>
                                        <OutlinedInput type="text" label="Image link i10" className={classes.input_style} onChange={(e) => { setArticle({ ...article, [item]: e.target.value }) }} />
                                    </FormControl>
                                )
                            }
                        })}
                        <Button variant="outlined" className={classes.submit} onClick={clickHandler}>Submit</Button>
                    </div>
                }
            </div>
        </div>

    )
}

export default Write;
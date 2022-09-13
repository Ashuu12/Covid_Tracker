import { makeStyles, Grid, Typography, Divider } from '@material-ui/core'
import { useState, useEffect } from 'react';
import { getSingleArticle } from '../../api/article';
import { useParams } from 'react-router-dom';
import Article from './Article'


const useStyles = makeStyles((theme) => ({
    container: { padding: "10px" },
    content: { padding: "50px" },
    imgLeft: { float: "left", marginRight: "20px", width: "50%" },
    imgRight: { float: "right", marginLeft: "20px", width: "50%" },
    img: { width: "100%" },
    para: { textAlign: "justify" },
    latestArticles: { padding: "10px" }
}))

const SingleArticle = () => {
    const classes = useStyles();
    const { id } = useParams();

    const [article, setArticle] = useState();

    useEffect(() => {
        (async () => {
            const data = await getSingleArticle(id);
            console.log("getSingleArticle response", data.data)
            if (data.error !== undefined) {
                alert("Incorrect URL!")
            } else {
                setArticle(data.data);
            }
        })();
    }, [id]);

    return (
        <Grid container>
            {article !== undefined && (
                <Grid item xs={9} container spacing={2} className={classes.container}>
                    <Grid item xs={12}>
                        <center><Typography variant="h4">{article.title}</Typography></center>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={4} className={classes.content}>
                            {(() => {
                                let value = [];
                                for (let i = 1; i < article.itemList.length; i++) {
                                    if (/^i/i.test(article.itemList[i])) {
                                        const num = parseInt(article.itemList[i].slice(1));
                                        try {
                                            if (num === parseInt(article.itemList[i + 1].slice(1))) {
                                                value.push(<Grid item xs={12}>
                                                    <img src={article.items[article.itemList[i]]} alt="Covid article image" className={classes.imgLeft} />
                                                    <Typography key={i + 1} variant="h6" className={classes.para}>{article.items[article.itemList[i + 1]]}</Typography>
                                                </Grid>);
                                                i++;
                                            } else {
                                                value.push(<Grid item xs={12}>
                                                    <img src={article.items[article.itemList[i]]} alt="Covid article image" className={classes.img} />
                                                </Grid>);
                                            }
                                        }
                                        catch (error) {
                                            // console.log(error)
                                            value.push(<Grid item xs={12}>
                                                <img src={article.items[article.itemList[i]]} alt="Covid article image" className={classes.img} />
                                            </Grid>);
                                        }
                                    }
                                    else if (/^p/i.test(article.itemList[i])) {
                                        const num = parseInt(article.itemList[i].slice(1));
                                        try {
                                            if (num === parseInt(article.itemList[i + 1].slice(1))) {
                                                value.push(<Grid item xs={12}>
                                                    <img src={article.items[article.itemList[i + 1]]} alt="Covid article image" className={classes.imgRight} />
                                                    <Typography key={i + 1} variant="h6" className={classes.para}>{article.items[article.itemList[i]]}</Typography>
                                                </Grid>);
                                                i++;
                                            } else {
                                                value.push(<Grid item xs={12}>
                                                    <Typography key={i + 1} variant="h6" className={classes.para}>{article.items[article.itemList[i]]}</Typography>
                                                </Grid>);
                                            }
                                        }
                                        catch (error) {
                                            // console.log(error)
                                            value.push(<Grid item xs={12}>
                                                <Typography key={i + 1} variant="h6" className={classes.para}>{article.items[article.itemList[i]]}</Typography>
                                            </Grid>);
                                        }
                                    }
                                }
                                return value;
                            })()}
                        </Grid>
                    </Grid>
                </Grid>
            )}
            <Grid item>
                <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={3} className={classes.latestArticles}>
                <center><Typography variant="h4">Latest Articles</Typography></center>
                <Article xs={12} />
            </Grid>
        </Grid>
    )
}

export default SingleArticle;
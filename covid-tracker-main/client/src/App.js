import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Cards, ChartComponent, CountryPicker, NavBar, SignUp, LogIn, Profile, Article, Write, SingleArticle, Store, Announcement, ProductList, Product, Cart, Success, Payment } from './components';
import styles from './App.module.css';
import { Grid, makeStyles } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';
import { fetchData } from './api';
import { getUser } from './api/user';

const useStyles = makeStyles({
  navBar: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
})

function App() {
  const classes = useStyles();
  const [user, setUser] = useState()
  const [data, setData] = useState({});
  const [country, setCountry] = useState('global');
  const [cookies, setCookie, removeCookie] = useCookies(['access-token']);

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData();

      setData(fetchedData);

    })()
  }, [])

  useEffect(() => {
    console.log(country);
    (async () => {
      const fetchedData = await fetchData(country);
      setData(fetchedData);
    })()
  }, [country]);

  useEffect(() => {
    (async () => {
      setUser(await (await getUser()).data);
    })();
    console.log(cookies["access-token"]);
  }, [cookies])

  const home = (
    <div className={styles.container}>
      <CountryPicker setCountry={setCountry}></CountryPicker>
      <Grid container spacing={10}>
        <Grid item lg={4}>
          <Cards data={data}></Cards>
        </Grid>
        <Grid item lg={8}>
          <ChartComponent data={data} country={country}></ChartComponent>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <>
      <Announcement></Announcement>
      <NavBar user={user} className={classes.navBar}></NavBar>
      <Routes>
        <Route path="/" element={home} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/article" element={<Article />} />
        <Route path="/article/:id" element={<SingleArticle />} />
        <Route path="/write" element={<Write />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products/:cat" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;

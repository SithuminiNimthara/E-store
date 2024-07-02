import React, {useState} from 'react'
import './App.css';

import { getCategories} from './fetcher'

import ProductDetails from './components/productDetails';
import Basket from './components/basket';
import Checkout from './components/checkout';
import Category from './components/Category';
import Layout from './components/layout';
import Home from './components/Home';
import OrderConfirmation from './components/orderConfirmation';
import SearchResult from './components/searchResult';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



function App() {
  const [categories, setCategories] = useState({errorMessage: '', data:[]});
  const [products, setProducts] = useState({errorMessage: '', data:[]});

  React.useEffect(() =>{
    const fetchData = async () =>{
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
  }, []);


  return (
    <React.Fragment>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout categories={categories}/>}>
            <Route index element={<Home/>}/>
           <Route path="basket" element={<Basket/>}/>
           <Route path="checkout" element={<Checkout/>}/>
           <Route path="orderConfirmation" element={<OrderConfirmation/>}/>
           <Route path="search" element={<SearchResult/>}/>
           <Route
            path="products/:productId"
            element={<ProductDetails/>}/>
           <Route 
            path="categories/:categoryId" 
            element={<Category/>}/>
            </Route>
    </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

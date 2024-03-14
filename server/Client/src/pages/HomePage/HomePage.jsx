import React from 'react'
import Nav from '../../components/Nav/Nav'
import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { uniqueArrayMaker } from "../../utils/uniqueArrayMaker";
import "./HomePage.css"
import { useSelector, useDispatch } from 'react-redux';
import { setAllCategories, setAllProducts } from '../../Store/Slices/productSlice';
import { Box, Drawer, Slider } from '@mui/material';
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer';
import RangeSlider from '../../components/RangeSlider/RangeSlider';



const HomePage = () => {

  const productsArr = useSelector((state) => state.products.filteredProducts)
  const categories = useSelector(state => state.products.categories)
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (productsArr.length === 0) {


        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data)
        const productsWithQuantity = data.map(product => { return { ...product, quantity: 0 } })
        console.log(productsWithQuantity)
        const allCategories = data.map(prd => prd.category);
        const uniqueCategories = uniqueArrayMaker(allCategories)
        uniqueCategories.unshift("All Products")
        dispatch(setAllProducts(productsWithQuantity));
        dispatch(setAllCategories(uniqueCategories));

        return data
      }
      return []
    },
  })



  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <Error />
  }
  return (
    <>


      <Nav isFilter />
      <div>
        <Box />
        <div className="slider">
          <RangeSlider />
        </div>
      </div>


      <section className="products">
        {productsArr.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            src={product.image}
            title={product.title}
            price={product.price}
            quantity={product.quantity}
          />
        ))} 
       
      </section>

    </>)
}

export default HomePage
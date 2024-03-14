import * as React from 'react';
import {useEffect} from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


import { setProductsByPrice } from '../../Store/Slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function valuetext(value) {
  return `${value}$`;
}

export default function RangeSlider() {
  const dispatch= useDispatch()
  const {minPrice, maxPrice}= useSelector(state=>state.products)
  const [value, setValue] = React.useState([minPrice, maxPrice]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{dispatch(setProductsByPrice(value))},[value])

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Price Range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min = {minPrice}
        max={maxPrice}
      />
    </Box>
  );
}
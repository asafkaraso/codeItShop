import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setDrawerOpened } from '../../Store/Slices/drawerSlice';

const NavigationButtons = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleNavigate = (path) =>{
      navigate(path)
    }
  
  return (
    <div>
      <button onClick={()=>{handleNavigate("/")}}>HOME</button>
      <button onClick={()=>{handleNavigate("/cart")}}>CART</button>
      <button onClick={()=>{handleNavigate("/about")}}>ABOUT</button>
      <button onClick={()=>{dispatch(setDrawerOpened())}}>DRAWER</button>
      <button onClick={()=>{handleNavigate("/adminPage")}}>ADMIN-PAGE</button>
      
    </div>
  )
}

export default NavigationButtons
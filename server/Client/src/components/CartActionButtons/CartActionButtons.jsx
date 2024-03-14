import React from 'react';
import "./CartActionButtons.css";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {setProductQuantity} from "../../Store/Slices/productSlice";


const CartActionButtons = ({id , quantity}) => {

    const dispatch= useDispatch()
    const handleProductToCart =(mode)=>{
        if(mode==="inc"){
            dispatch(setProductQuantity({id, quantity:quantity+1}))
        }else{
            if(quantity<1){
                return
            }
            dispatch(setProductQuantity({id , quantity:quantity-1}))
        }
    }
  return (
    <div className="quantity to cart">
        <Button onClick={()=>handleProductToCart("dec")}>-</Button>
        <span>{quantity}</span>
        <Button onClick={()=>handleProductToCart("inc")}>+</Button>
      </div>
  )
}

export default CartActionButtons
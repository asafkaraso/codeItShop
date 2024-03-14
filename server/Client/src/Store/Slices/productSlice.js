import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  singleProduct: {},
  categories: [],
  chosenCategory: "All Products",
  minPrice:0,
  maxPrice:0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      const allPrices = action.payload.map(p=>p.price).sort((a,b) => a-b)
      state.minPrice = allPrices[0]
      state.maxPrice = allPrices[allPrices.length-1]
     
    },
    setSingleProducts: (state, action) => {
      state.singleProduct = action.payload;
    },
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    setChosenCategory: (state, action) => {
      state.chosenCategory = action.payload;
      if (action.payload === "All Products") {
        console.log("here")
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.category === action.payload
        );
      }
    },
    setProductQuantity: (state, action) => {
      // console.log(action.payload)

      const productIndex = state.products.findIndex(prd => prd.id === action.payload.id)
      // console.log('p', productIndex)
      state.products[productIndex].quantity = action.payload.quantity
      // console.log(state.products[productIndex])
      state.filteredProducts[productIndex].quantity = action.payload.quantity
    },
    setProductsByPrice: (state, action) => {
      if (state.chosenCategory === "All Products") {
        state.filteredProducts = state.products.filter(p => p.price >= action.payload[0] && p.price <= action.payload[1])
      }else{
        state.filteredProducts = state.products.filter(p => p.category === state.chosenCategory).filter(p => p.price >= action.payload[0] && p.price <= action.payload[1])
      }
    }
    




  },
});

export const {
  setAllProducts,
  setSingleProducts,
  setAllCategories,
  setChosenCategory,
  setProductQuantity,
  setProductsByPrice
} = productsSlice.actions;

export default productsSlice.reducer;
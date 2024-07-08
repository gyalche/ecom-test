import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/product.slice";
const rootReducer = combineReducers({
  product: productSlice,
});

export default rootReducer;

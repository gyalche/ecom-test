import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type userType = {
  favroiteProduct: Array<any>;
  cart: Array<any>;
};
const initialState: userType = {
  favroiteProduct: [],
  cart: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToFavroite: (state, action: PayloadAction<any>) => {
      state.favroiteProduct.push(action.payload);
    },
    removeFromFavroite: (state, action: PayloadAction<any>) => {
      const index = state.favroiteProduct.findIndex(
        (idx) => idx?.id === action.payload
      );
      state.favroiteProduct.splice(index, 1);
    },
    addToBag: (state, action: PayloadAction<any>) => {
      // state.cart = [];
      state.cart = [...state.cart, action.payload];
      console.log("ddddd", state.cart);
    },
    removeFromBag: (state, action: PayloadAction<any>) => {
      const index = state.cart.findIndex((idx) => idx?.id === action.payload);
      state.cart.splice(index, 1);
    },
  },
});

export const { addToFavroite, removeFromFavroite, addToBag, removeFromBag } =
  productSlice.actions;

export const getFavList = (state: any) => state?.product?.favroiteProduct;
export const getBagged = (state: any) => state?.product?.cart;
export default productSlice.reducer;

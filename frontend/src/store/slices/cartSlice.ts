import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types";
import { updateCart } from "../../utils/cartUtils";
export interface CartState {
  shippingPrice: string;
  itemsPrice: string;
  cartItems: Cart[];
  taxPrice: string;
  totalPrice: string;
}

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "")
  : { cartItems: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Cart>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removefromCart: (state: CartState, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
  },
});
export const getCart = () => (state: { cart: CartState }) => state.cart;
export const getCartCount = () => (state: { cart: CartState }) =>
  state.cart.cartItems.reduce((a, c) => a + c.qty, 0);
const { reducer: cartReducer, actions } = cartSlice;
export const { addToCart, removefromCart } = actions;
export default cartReducer;

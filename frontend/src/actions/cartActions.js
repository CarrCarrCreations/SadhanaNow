import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/lectures/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      lecture: data._id,
      name: data.title,
      image: data.image,
      price: data.price,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};

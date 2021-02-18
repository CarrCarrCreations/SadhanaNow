import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

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

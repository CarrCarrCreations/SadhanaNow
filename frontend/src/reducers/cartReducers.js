import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // Does the item already exist in the cart?
      const existItem = state.cartItems.find((x) => x.lecture === item.lecture);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.lecture === existItem.lecture ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};

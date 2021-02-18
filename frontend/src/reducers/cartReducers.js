import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

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
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.lecture !== action.payload),
      };
    default:
      return state;
  }
};

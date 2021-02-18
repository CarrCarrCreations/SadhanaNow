import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const CartScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const lectureId = match.params.id;

  useEffect(() => {
    if (lectureId) {
      dispatch(addToCart(lectureId));
    }
  }, [dispatch, lectureId]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return <div>Cart</div>;
};

export default CartScreen;

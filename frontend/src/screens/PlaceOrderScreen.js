import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.totalPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price, 0)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col md={5}>
                          <Link to={`/lecture/${item.lecture}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>{item.price} €</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{cart.totalPrice} €</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;

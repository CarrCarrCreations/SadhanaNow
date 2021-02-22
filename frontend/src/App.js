import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LectureScreen from "./screens/LectureScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlacePaymentScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login/" component={LoginScreen} />
          <Route path="/register/" component={RegisterScreen} />
          <Route path="/profile/" component={ProfileScreen} />
          <Route path="/lecture/:id" component={LectureScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/payment/" component={PaymentScreen} />
          <Route path="/placeorder/" component={PlacePaymentScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/" exact component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

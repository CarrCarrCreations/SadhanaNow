import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Lecture from "../components/Lecture";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listLectures } from "../actions/lectureActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listLectures());
  }, [dispatch]);

  const lectureList = useSelector((state) => state.lectureList);
  const { loading, error, lectures } = lectureList;

  return (
    <>
      <h1>Latest Classes</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {lectures.map((lecture) => (
            <Col key={lecture._id} sm={12} md={6} lg={4}>
              <Lecture lecture={lecture} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;

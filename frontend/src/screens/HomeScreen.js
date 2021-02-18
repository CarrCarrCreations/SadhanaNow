import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Lecture from "../components/Lecture";
import { listLectures } from "../actions/lectureActions.js";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listLectures());
  }, [dispatch]);

  const lectureList = useSelector((state) => state.lectureList);
  const { loading, error, lectures } = lectureList;

  // return <></>;

  return (
    <>
      <h1>Latest Classes</h1>
      {loading ? (
        <h2>LOADING...</h2>
      ) : error ? (
        <h3>{error}</h3>
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

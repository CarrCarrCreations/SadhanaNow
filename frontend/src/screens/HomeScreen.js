import React from "react";
import { Row, Col } from "react-bootstrap";
import Lecture from "../components/Lecture";
import lectures from "../lectures";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Classes</h1>
      <Row>
        {lectures.map((lecture) => (
          <Col sm={12} md={6} lg={4}>
            <Lecture lecture={lecture} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;

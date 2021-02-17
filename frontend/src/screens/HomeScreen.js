import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Lecture from "../components/Lecture";

const HomeScreen = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      const { data } = await axios.get("http://localhost:5000/api/lectures/");
      setLectures(data);
    };
    fetchLectures();
  }, []);

  return (
    <>
      <h1>Latest Classes</h1>
      <Row>
        {lectures.map((lecture) => (
          <Col key={lecture._id} sm={12} md={6} lg={4}>
            <Lecture lecture={lecture} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;

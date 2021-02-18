import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listLectureDetails } from "../actions/lectureActions";

const LectureScreen = ({ match }) => {
  const dispatch = useDispatch();

  const lectureDetails = useSelector((state) => state.lectureDetails);
  const { loading, error, lecture } = lectureDetails;

  useEffect(() => {
    dispatch(listLectureDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={lecture.image} alt={lecture.title} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{lecture.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={lecture.rating}
                  text={`${lecture.numReviews} reviews`}
                ></Rating>
              </ListGroup.Item>

              <ListGroup.Item>{lecture.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{lecture.price}€</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Button className="btn-block" type="button">
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default LectureScreen;

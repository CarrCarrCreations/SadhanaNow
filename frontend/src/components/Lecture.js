import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";

const Lecture = ({ lecture }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/lecture/${lecture._id}`}>
        <Card.Img src={lecture.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/lecture/${lecture._id}`}>
          <Card.Title as="div">
            <strong>{lecture.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={lecture.rating}
            text={`${lecture.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">{lecture.price}€</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Lecture;

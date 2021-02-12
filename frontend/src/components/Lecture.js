import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";

const Lecture = ({ lecture }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/lecture/${lecture._id}`}>
        <Card.Img src={lecture.image} variant="top" />
      </a>

      <Card.Body>
        <a href={`/lecture/${lecture._id}`}>
          <Card.Title as="div">
            <strong>{lecture.title}</strong>
          </Card.Title>
        </a>

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

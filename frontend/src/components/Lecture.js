import React from "react";
import { Card } from "react-bootstrap";

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
          <div className="my-3">
            {lecture.rating} from {lecture.numReviews} reviews
          </div>
        </Card.Text>

        <Card.Text as="h3">{lecture.price}€</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Lecture;

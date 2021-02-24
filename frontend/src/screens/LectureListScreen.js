import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listLectures, deleteLecture } from "../actions/lectureActions";

const LectureListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const lectureList = useSelector((state) => state.lectureList);
  const { loading, error, lectures } = lectureList;

  const lectureDelete = useSelector((state) => state.lectureDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = lectureDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createLectureHandler = (lecture) => {
    // CREATE LECTURE ACTION
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteLecture(id));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listLectures());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, lectureDelete]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Lectures</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createLectureHandler}>
            <i className="fas fa-plus"></i> Create Lecture
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture) => (
              <tr key={lecture._id}>
                <td>{lecture._id}</td>
                <td>{lecture.title}</td>
                <td>{lecture.price} €</td>
                <td>
                  <LinkContainer to={`/admin/lecture/${lecture._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(lecture._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default LectureListScreen;

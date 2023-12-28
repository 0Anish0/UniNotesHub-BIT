import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  Card,
  Button,
  Row,
  Spinner,
  Col,
  OverlayTrigger,
  Tooltip,
  Toast,
} from "react-bootstrap";
import SinglePost from "../components/posts/SinglePost";
import { AddPostModal } from "../components/posts/AddPostModal";
import { UpdatePostModal } from "../components/posts/UpdatePostModal";
import addIcon from "../assets/plus-circle-fill.svg";

function Dashboard() {
  //CONTEXT
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  //START:GET ALL POSTS
  useEffect(() => {
    getPosts();
  }, [posts]);

  let body;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to UniNotesHub</Card.Title>
            <Card.Text>Click the button below to add new note</Card.Text>
            <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
              Add
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="mmy-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* OPEN ADD POST MODAL */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={() => setShowAddPostModal(true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* AFTER POST IS POSTED, SHOW TOAST */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() => setShowToast({ show: false, message: "", type: null })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
}

export default Dashboard;

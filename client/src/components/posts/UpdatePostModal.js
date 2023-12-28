import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";

export const UpdatePostModal = () => {
  ///CONTEXT
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    editPost,
    setShowToast,
  } = useContext(PostContext);

  //STATE
  const [updatedPost, setUpdatedNewPost] = useState(post);

  useEffect(() => {
    setUpdatedNewPost(post);
  }, [post]);

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPostForm = (e) => {
    setUpdatedNewPost({ ...updatedPost, [e.target.name]: e.target.value });
  };

  const closeDialog = () => {
    setUpdatedNewPost(post);
    setShowUpdatePostModal(false);
  };

  //SUBMIT FORM
  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await editPost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <div>
      <Modal show={showUpdatePostModal} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Making changes?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
                aria-describedby="title-help"
                value={title}
                onChange={onChangeUpdatedPostForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                name="description"
                value={description}
                onChange={onChangeUpdatedPostForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Link to the documentation"
                name="url"
                value={url}
                onChange={onChangeUpdatedPostForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                value={status}
                name="status"
                onChange={onChangeUpdatedPostForm}
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="info" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

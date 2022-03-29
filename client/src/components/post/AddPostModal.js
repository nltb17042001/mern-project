import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import React, { useState } from "react";
import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
const AddPostModal = () => {
  //context
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);
  //State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, description, url, status } = newPost;
  console.log(newPost);
  const onChangeNewPostFrom = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  console.log(newPost);
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    console.log(message);
    resetShowAddPostModal();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetShowAddPostModal = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "" || "TO LEARN",
    });
    setShowAddPostModal(false);
  };
  const closeDialog = () => {
    resetShowAddPostModal();
  };
  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn? </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostFrom}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewPostFrom}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="URL "
              name="url"
              value={url}
              onChange={onChangeNewPostFrom}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;

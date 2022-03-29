import React from "react";
import Button from "react-bootstrap/Button";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/post/SinglePost";
import AddPostModal from "../components/post/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import UpdatePostModal from "../components/post/UpdatePostModal";

const Dashboard = () => {
  //context
  const {
    postState: { post, posts, postLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  //Start get all post
  useEffect(() => getPosts(), []);
  // tooltip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add a new learn
    </Tooltip>
  );
  let body = null;
  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">HI</Card.Header>
          <Card.Body>
            <Card.Title>Wellcome {username}</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              onClick={setShowAddPostModal.bind(this, true)}
              variant="primary"
            >
              Learn It!
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
            <Col key={post._id} className="my-2">
              <SinglePost post={post}></SinglePost>
            </Col>
          ))}
        </Row>
        {/* Open add post modal */}
        <OverlayTrigger placement="left" overlay={renderTooltip}>
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
            variant="light"
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
      <AddPostModal></AddPostModal>
      {post !== null && <UpdatePostModal></UpdatePostModal>}
      {/* after post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px " }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;

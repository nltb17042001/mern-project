import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIon from "../../assets/trash.svg";

import React, { useContext } from "react";
import { PostContext } from "../../context/PostContext";

const ActionButton = ({ url, _id }) => {
  //context
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);
  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };
  return (
    <>
      <Button href={url} className="post-button" target="_blank" variant="link">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button
        variant="link"
        className="post-button"
        onClick={choosePost.bind(this, _id)}
      >
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button
        variant="link"
        onClick={deletePost.bind(this, _id)}
        className="post-button"
      >
        <img src={deleteIon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButton;

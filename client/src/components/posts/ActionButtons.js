import { Button } from "react-bootstrap";
import linkIcon from "../../assets/link-btn.png";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img
          src={linkIcon}
          alt="play"
          width="32"
          height="32"
          fill="currentColor"
        />
      </Button>
      <Button className="post-button">
        <img
          src={editIcon}
          alt="edit"
          width="24"
          height="24"
          onClick={choosePost.bind(this, _id)}
        />
      </Button>
      <Button className="post-button" onClick={deletePost.bind(this, _id)}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;

import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../context/currentUserContext";
import useAlert from "../../hooks/useAlert";

const Comment = (props) => {
  const {id, profile_id, profile_image, owner, updated_at, content, setReviews, setComments, reviewId } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { setAlert } = useAlert();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/api/comments/${id}/`);

      setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));

      setReviews((prevReviews) => {
        return prevReviews.map((prevReview) => {
          if (prevReview.id === reviewId) {
            return {
              ...prevReview,
              comments_count: prevReview.comments_count - 1, 
            };
          }
          return prevReview;
        });
      });
      setAlert('Comment deleted successfully', 'success');

    } catch (err) {
      console.log(err);
      setAlert('Failed to delete comment', 'error');
    }
  };

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
        {is_owner && (
          <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete} />
        )}
      </Media>
    </div>
  );
};

export default Comment;